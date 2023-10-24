require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const db = require('./db.js')

const userRoutes = require('./routes/userRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const productListRoutes = require('./routes/productListRoutes.js');
const cityRoutes = require('./routes/cityRoutes.js');
const shopRoutes = require('./routes/shopRoutes.js');
const productRoutes = require('./routes/productRoutes.js')
const shopListRoutes = require('./routes/shopListRoutes.js')
const shopHasAProductsRoutes = require('./routes/shophasaproductRoutes.js');
const shoppingListRoutes = require('./routes/shoppingListRoutes.js'); 

//middleware
app.use(express.json())
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/products", productListRoutes)
app.use("/api/shops", shopListRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cities", cityRoutes)
app.use("/api/shop", shopRoutes)
app.use("/api/shophasaproducts", shopHasAProductsRoutes)
app.use("/api/shoppingLists", shoppingListRoutes);

const port = process.env.PORT ;

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
