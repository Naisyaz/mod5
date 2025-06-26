const express = require("express")
const app = express()
const productRoutes = require("./routes/products")
const userRoutes = require("./routes/user")
const verifyToken = require("./middleware/auth")
app.use(express.json())

const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://naisyaz:1234@cluster0.llb16i0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("Connection error:", err));


function logger(req, res, next) {
    console.log('${req.method} ${req.url}');
    next ();
}



//        Request    Response
app.get("/", (req, res) => {
    res.send("API OK! SERVER OK! NODEMON OK!")

})

app.get("/search", (req, res) => {
    const keyword = req.query.q;
    const keyword2 = req.query.type;
    res.send(`Searching for ${keyword} and ${keyword2}`);
  });

app.get("/test", (req, res) => {
    res.send("Test route OK!")

})

app.post("/message", (req, res) => {
    const message = req.body.text;
    res.send('You said: ${message}')
})

app.use("/products", productRoutes)

app.get("/dashboard", verifyToken, (req, res) => {
   res.send("Protected content!");
})   

app.listen(3000, () => console.log("Server is running on http://localhost:3000"))

