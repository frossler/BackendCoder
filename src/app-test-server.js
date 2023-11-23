import './daos/mongodb/dbconnection.js';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/product.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.use('/products', productsRouter);

 
app.use(errorHandler);

app.listen(PORT, () => {console.log('Server UP on port '+ PORT)});
