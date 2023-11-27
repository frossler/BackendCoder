import './daos/mongodb/dbconnection.js';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/product.router.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
const PORT = 8080;
ññ
// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


// ROuters
app.use('/products', productsRouter);

// Middlwares
app.use(errorHandler);

// Server Instance
app.listen(PORT, () => {console.log('Server UP on port '+ PORT)});
