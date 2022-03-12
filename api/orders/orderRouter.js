const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middleware/verifyToken');

const OrderService = require('./OrderService');

// CREATE

router.post('/', verifyToken, async (req, res) => {
  try {
    const newOrder = await OrderService.save(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ mesage: 'something went wrong' });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await OrderService.update(req.params.id, req.body);

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await OrderService.deleteById(req.params.id);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  try {
    const productId = req.query.pid;
    const statistic = await OrderService.getStaticIncome(productId);
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET USER ORDERS

router.get('/:userId', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByUser(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await OrderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

module.exports = router;
