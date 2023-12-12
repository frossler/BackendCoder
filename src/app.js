import express from 'express';
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from 'morgan';
import handlebars from "express-handlebars";

import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import viewRouter from './routes/view.router.js';

import  __dirname  from './utils.js';
import MongoStore from "connect-mongo";
import { initMongoDB, MONGO_URL } from './daos/mongodb/dbconnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import serverSocketIO from './socket/websocket.js';

////////////////////////////////////////////////////////////////////////

// MongoStore & Cookies
const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 120,
      crypto: {
        secret: '1234'
      }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000,
    },
  };

// Express
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', chatRouter);
app.use('/', viewRouter);

// Session management
app.use(session(mongoStoreOptions));

// HBS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middlwares
app.use(errorHandler);

// // Persistence
const persistence = "MONGO";
if (persistence === "MONGO") await initMongoDB();

// Server Instance
const httpServer = app.listen(PORT, () => console.log(` >>> Server Running 🚀 on port # ${PORT}`));
// Websocket
serverSocketIO(httpServer);