export default {
  routes: [
    {
      method: "POST",
      path: "/stripe/checkout",
      handler: "stripe.getCheckoutSession",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/stripe/success/:orderid",
      handler: "stripe.checkoutSessionSuccess",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/stripe/testfunction",
      handler: "stripe.testfunction",
      config: {
        auth: false,
      },
    },
  ],
};
