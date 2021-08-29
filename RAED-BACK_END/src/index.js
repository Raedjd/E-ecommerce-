const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT,POST','GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});
   
mongoose.connect(
`mongodb+srv://raed:raedjaidi@cluster0.aqqi5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  });
//routes
const authRoutes = require("./routesRaedjd/auth");
const adminRoutes = require("./routesRaedjd/admin/auth");
const categoryRoutes = require("./routesRaedjd/category");
const productRoutes = require("./routesRaedjd/product");
const cartRoutes = require("./routesRaedjd/cart");
const addressRoutes = require("./routesRaedjd/address");
const billRoutes = require("./routesRaedjd/bill");
//middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes );
app.use("/api", addressRoutes );
app.use("/api", billRoutes );
env.config();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });