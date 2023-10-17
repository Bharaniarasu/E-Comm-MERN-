const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.paymentProcess = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    description: "Payment Test",
    metadata: { integration_check: "accept_payment" },
    shipping: req.body.shipping,
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
