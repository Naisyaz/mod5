const express = require("express")
const app = express()
app.use(express.json())

function logger(req, res, next) {
    console.log('${req.method} ${req.url}');
    next ();
}

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

//        Request    Response
app.get("/", (req, res) => {
    res.send("API OK! SERVER OK! NODEMON OK!")

})

app.get("/test", (req, res) => {
    res.send("Test route OK!")

})
// This is READ from CRUD
app.get("/products", (req, res) => {
    res.json(products)

})

app.post("/products", (req, res) => {
    const lastProduct = products[products.length - 1]
    const lastId = lastProduct.id    
    const pid = req.body.id
    const pname = req.body.name
    const newProduct = {
        id: pid,
        name: pname
    }
    products.push(newProduct)
    res.json(newProduct)
})

app.post("/message", (req, res) => {
    const message = req.body.text;
    res.send('You said: ${message}')
})

// This is UPDATE from CRUD
app.put("/products/:pid", (req, res) => {
    const pid = req.params.pid
    const newProductName = req.body.name
    const indexOfProduct = products.findIndex(product => product.id == pid)
    products[indexOfProduct].name = newProductName
    res.json(products[indexOfProduct])
})    

// This is DELETE from CRUD
app.delete("/products/:pid", (req, res) => {
    const pid = req.params.pid
    const indexOfProduct = products.findIndex(product => product.id == pid)
    products.splice(indexOfProduct, 1)
    res.json(products)
})

app.listen(3000, () => console.log("Server is running on http://localhost:3000"))

