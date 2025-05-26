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
        let itemsString: string = "Technika: ";
        let productString: string = "Produkty: ";

        rentalItems.map((item) => {
          itemsString =
            itemsString + ` / Jméno: ${item.item.name} - Počet: ${item.count}`;
        });

        additionalItems.map((item) => {
          productString =
            productString +
            ` / Jméno: ${item.item.name} - Počet: ${item.count}`;
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
          },
        };

        const pipedriveDeal = await PipedriveV2("deals", "POST", dealBody);

        console.log(pipedriveDeal);

        const activityDeliveryBody = await {
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
          note: `<p>${itemsString}</p> <p>${productString} </p>`,
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
          note: `<p>Technika: ${itemsString}</p> <p>Produkty: ${productString} </p>`,
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
