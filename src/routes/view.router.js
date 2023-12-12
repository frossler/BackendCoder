import { Router } from "express";
import * as controller from "../controllers/view.controller.js";

const router = Router();

router.get("/home", controller.renderHome);
router.get("/realtimeproducts", controller.renderRealTimeProducts);
router.get("/chat", controller.renderChat);


// Requiered to add in this / route
router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/profile', (req, res)=>{
    res.render('profile')
})

router.get('/register-error', (req, res)=>{
    res.render('register-error')
})

export default router;
