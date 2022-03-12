const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

const ProductService = require('./ProductService');

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log(req.body);
    const savedProduct = await ProductService.save(req.body);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ mesage: 'something went wrong' });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await ProductService.update(req.params.id, req.body);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ mesage: 'something went wrong' });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET PRODUCT

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductService.getProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

// GET ALL PRODUCTS

router.get('/', async (req, res) => {
  try {
    const product = await ProductService.getProducts(req.query);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

module.exports = router;
