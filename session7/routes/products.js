const express = require('express')
const router = express.Router()
const logger = require("../middleware/logger")
router.use(logger)

const Products = require("../models/Products")

const products = [
    {
        id: 1,
        name: "Shampoo"
    },
    { 
        id: 2,
        name: "Toothpaste"
    },
    {
        id: 3,
        name: "Toothbrush"
    }
]

// This is READ from CRUD
router.get("/", async (req, res) => {
    const productFromDB = await Products.find()
    res.json(productFromDB)

})

router.get("/", (req, res) => {
    const query = req.query.q
    const searchProducts = products.filter(product => product.name.includes(query))
    res.json(searchProducts)

})

router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    const saved = await product.save();
    res.json(saved)
})

// This is UPDATE from CRUD
router.put("/:pid", async (req, res) => {
    const updated = await Products.findByIdAndUpdate(req.params.pid, req.body, { new: true})
    res.json(updated)
})    

// This is DELETE from CRUD
router.delete("/:pid", async (req, res) => {
    await Products.findByIdAndDelete(req.params.id)
    res.json(await Products.find())
})

module.exports = router