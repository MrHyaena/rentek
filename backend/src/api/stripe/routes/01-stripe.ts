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
      method: "POST",
      path: "/stripe/success",
      handler: "stripe.checkoutSessionSuccess",
      config: {
        auth: false,
      },
    },
  ],
};
