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
      path: "/stripe/success",
      handler: "stripe.checkoutSessionSuccess",
      config: {
        auth: false,
      },
    },
  ],
};
