import "./db/dbconnection.js";
import express from "express";
import productsRouter from "./routes/mdb-products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);

const PORT = 8080;

app.listen(PORT, ()=>console.log("Connected to port" + PORT));

