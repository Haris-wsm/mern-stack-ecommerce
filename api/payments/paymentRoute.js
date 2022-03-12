const router = require('express').Router();

const stripe = require('stripe')(process.env.keySecret);

router.post('/payment', async (req, res) => {
  try {
    const data = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
      description: 'My First Test Charge (created for API docs)'
    });
    res.status(200).json({ ...data });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
