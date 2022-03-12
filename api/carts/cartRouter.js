const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middleware/verifyToken');

const CartService = require('./CartService');

// CREATE

router.post('/', verifyToken, async (req, res) => {
  try {
    const newCart = await CartService.save(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ mesage: 'something went wrong' });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await CartService.update(req.params.id, req.body);

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await CartService.deleteById(req.params.id);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET USER CART

router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await CartService.getCart(req.params.userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET ALL PRODUCTS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

module.exports = router;
