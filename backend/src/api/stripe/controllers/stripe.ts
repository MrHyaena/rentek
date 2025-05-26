/**
 * stripe controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const strapi = require("@strapi/strapi");

import { factories } from "@strapi/strapi";
import { PipedriveV2 } from "../../../myfunctions/pipedrive";
import { format } from "date-fns";
import order from "../../order/controllers/order";

export default factories.createCoreController(
  "api::stripe.stripe",
  ({ strapi }) => ({
    async getCheckoutSession(ctx) {
      const data = JSON.parse(ctx.request.body);
      let url =
        process.env.API_SERVER + `/api/stripe/success/${data.documentId}`;

      try {
        //Creating STRIPE checkout session
        const session = await stripe.checkout.sessions.create({
          success_url: url,
          ui_mode: "hosted",
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "CZK",
                product_data: {
                  name: "Objednávka - 5 % celkové ceny objednávky",
                },
                unit_amount: data.payNowPrice * 100,
              },
              quantity: 1,
            },
          ],
        });

        ctx.body = session;
      } catch (err) {
        ctx.body = err;
      }
    },
    async checkoutSessionSuccess(ctx) {
      let params = ctx.request["params"];

      const strapiOrder = await fetch(
        process.env.API_SERVER + `/api/orders/${params.orderid}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_READONLY_API}`,
          },
        }
      );
      const json: any = await strapiOrder.json();
      const orderInformation = JSON.parse(json.data.orderInformation);
      const rentalItems = JSON.parse(json.data.rentalItems);
      const additionalItems = JSON.parse(json.data.additionalItems);
      let startDate = orderInformation.dateRange.startDate;
      let endDate = orderInformation.dateRange.endDate;

      try {
        const strapiTimeslot: any = await fetch(
          process.env.API_SERVER + "/api/timeslots",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${process.env.STRAPI_READONLY_API}`,
            },
            body: JSON.stringify({
              data: {
                orderId: JSON.stringify(json.data.documentId),
                delivery: startDate,
                pickup: endDate,
              },
            }),
          }
        );
      } catch (error) {}

      try {
        let itemsString: string | null = null;
        let productString: string | null = null;

        rentalItems.map((item) => {
          if (itemsString == null) {
            itemsString = `<li>${item.item.name} - Počet: ${item.count} </li>`;
          } else {
            itemsString =
              itemsString +
              `<li>${item.item.name} - Počet: ${item.count} </li>`;
          }
        });

        additionalItems.map((item) => {
          if (productString == null) {
            productString = `<li>${item.item.name} - Počet: ${item.count} </li>`;
          } else {
            productString =
              productString +
              `<li>${item.item.name} - Počet: ${item.count} </li>`;
          }
        });

        const personBody = await {
          name: `${orderInformation.contact.jmeno} ${orderInformation.contact.prijmeni}`,
          emails: [
            { value: `${orderInformation.contact.email}`, primary: true },
          ],
          phones: [
            { value: `${orderInformation.contact.telefon}`, primary: true },
          ],
        };

        const pipedrivePerson = await PipedriveV2(
          "persons",
          "POST",
          personBody
        );

        const dealBody = await {
          title: `Výpůjčka - ${json.data.documentId}`,
          person_id: pipedrivePerson.data.id,
          value: json.data.afterSalePrice,
          currency: "CZK",
          custom_fields: {
            //Doplatek
            "97d30ff3043069f3b307faf51efce7c359f8b6e5": (
              json.data.afterSalePrice - json.data.payNowPrice
            ).toString(),
            //Cena před slevou
            "0c009f11a8dc8647931e03260bed41975932f533":
              json.data.price.toString(),
            //Cena po slevě
            "791284165b256bc0e55a6631df0803a98c257937":
              json.data.afterSalePrice.toString(),
            //Jmeno
            "16185306e53f189ae97c6ffa6e4650f77dac9419":
              orderInformation.contact.jmeno.toString(),
            //Prijmeni
            "5373cbb402366fa93e8b650db79a1fc84a7f53e8":
              orderInformation.contact.prijmeni.toString(),
            //Email
            "598febcf061c8207b5a96191701df4fe30b75456":
              orderInformation.contact.email.toString(),
            //Telefon
            "4bf6ca46c825f1b8e771f55d14fb46245ee171f1":
              orderInformation.contact.telefon,
            //Ulice
            a510a3128419f358c03cc252266397c5f5da2d1c:
              orderInformation.deliveryAddress.ulice.toString(),
            //ČP
            a5607a0f617db28a2c7fd063678d356477fd8957:
              orderInformation.deliveryAddress.cp.toString(),
            //Město
            "5b5f7eede36fbbd0806074735ec0267c9d922cae":
              orderInformation.deliveryAddress.mesto.toString(),
            //PSČ
            "1366f1e1ffa9d80d7d8f62138a30b0f76442feef":
              orderInformation.deliveryAddress.psc.toString(),
          },
        };

        const pipedriveDeal = await PipedriveV2("deals", "POST", dealBody);

        console.log(pipedriveDeal);

        const activityDeliveryBody = await {
          owner_id: 23212272,
          participants: [{ person_id: pipedrivePerson.data.id, primary: true }],
          subject: "Doručení techniky",
          deal_id: pipedriveDeal.data.id,
          due_date: format(orderInformation.dateRange.startDate, "yyyy-MM-dd"),
          due_time: format(orderInformation.dateRange.startDate, "hh:mm"),
          location: {
            value: `${orderInformation.deliveryAddress.ulice}, ${orderInformation.deliveryAddress.cp}, ${orderInformation.deliveryAddress.mesto}, ${orderInformation.deliveryAddress.psc}`,
            street_number: orderInformation.deliveryAddress.cp,
            route: orderInformation.deliveryAddress.ulice,
            sublocality: "",
            locality: orderInformation.deliveryAddress.mesto,
            admin_area_level_1: "",
            admin_area_level_2: "",
            country: "Czech Republic",
            postal_code: orderInformation.deliveryAddress.psc,
            formatted_address: `${orderInformation.deliveryAddress.ulice}, ${orderInformation.deliveryAddress.cp}, ${orderInformation.deliveryAddress.mesto}, ${orderInformation.deliveryAddress.psc}`,
          },
          note: `<h3>Technika</h3><ul>${itemsString}</ul> <h3>Produkty</h3><ul>${productString} </ul>`,
        };

        const pipedriveActivityDelivery = await PipedriveV2(
          "activities",
          "POST",
          activityDeliveryBody
        );

        if (pipedriveActivityDelivery.success != true) {
          throw Error(pipedriveActivityDelivery.error);
        }

        const activityPickupBody = await {
          owner_id: 23212272,

          participants: [{ person_id: pipedrivePerson.data.id, primary: true }],
          subject: "Vyzvednutí techniky",
          deal_id: pipedriveDeal.data.id,
          due_date: format(orderInformation.dateRange.endDate, "yyyy-MM-dd"),
          due_time: format(orderInformation.dateRange.endDate, "hh:mm"),
          location: {
            value: `${orderInformation.deliveryAddress.ulice}, ${orderInformation.deliveryAddress.cp}, ${orderInformation.deliveryAddress.mesto}, ${orderInformation.deliveryAddress.psc}`,
            street_number: orderInformation.deliveryAddress.cp,
            route: orderInformation.deliveryAddress.ulice,
            sublocality: "",
            locality: orderInformation.deliveryAddress.mesto,
            admin_area_level_1: "",
            admin_area_level_2: "",
            country: "Czech Republic",
            postal_code: orderInformation.deliveryAddress.psc,
            formatted_address: `${orderInformation.deliveryAddress.ulice}, ${orderInformation.deliveryAddress.cp}, ${orderInformation.deliveryAddress.mesto}, ${orderInformation.deliveryAddress.psc}`,
          },
          note: `<h3>Technika</h3><ul>${itemsString}</ul> <h3>Produkty</h3><ul>${productString} </ul>`,
        };

        const pipedriveActivityPickup = await PipedriveV2(
          "activities",
          "POST",
          activityPickupBody
        );

        if (pipedriveActivityPickup.success != true) {
          throw Error(pipedriveActivityPickup.error);
        }
      } catch (error) {
        console.log(error);
      }

      //ctx.response.redirect(process.env.API_WEB + "/dekujeme");
    },
  })
);
