import { isWithinInterval } from "date-fns";

//Function for providing availability data
export function AvailabilityData(
  timeslots: any,
  item: any,
  daterange: {
    startDate: any;
    endDate: any;
    startIsValid: any;
    endIsValid: any;
  },
  cart: any
) {
  //Matching timeslots by date
  const arrayTimeslotsByDate = timeslots.filter(
    (timeslot: { [key: string]: any }) => {
      if (
        isWithinInterval(timeslot.delivery, {
          start: daterange.startDate,
          end: daterange.endDate,
        }) ||
        isWithinInterval(daterange.startDate, {
          start: timeslot.delivery,
          end: timeslot.pickup,
        }) ||
        isWithinInterval(timeslot.pickup, {
          start: daterange.startDate,
          end: daterange.endDate,
        }) ||
        isWithinInterval(daterange.endDate, {
          start: timeslot.delivery,
          end: timeslot.pickup,
        })
      ) {
        return true;
      }
    }
  );
  let rentedAmount: any = 0;

  //Matching date checked timeslots by items
  const arrayTimeslotsByItem = arrayTimeslotsByDate.filter(
    (timeslot: { [key: string]: any }) => {
      const productArray = timeslot.products.filter(
        (product: { [key: string]: any }) => {
          if (product.item.documentId == item.documentId) {
            rentedAmount = rentedAmount + product.count;
            return true;
          }
        }
      );

      if (productArray.length > 0) {
        return true;
      }
    }
  );

  //Counting real amount of items in storage
  const realAmount = item.amount - rentedAmount;

  let grayScale = 100;

  if (realAmount == 0) {
    grayScale = 50;
  }

  const cartItem = cart.find(
    (itemCart: any) => itemCart.item.documentId == item.documentId
  );

  return { cartItem, realAmount, grayScale, arrayTimeslotsByItem };
}
