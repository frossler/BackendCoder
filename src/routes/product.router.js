import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

// // File Import Endpoint
router.post('/file', controller.createFileController);

// // Aggregate Routes
router.get('/aggregation1', controller.aggregation1);

router.get('/id/:id', controller.getById);

router.get('/all', controller.getAll);

router.get('/', controller.getByLimit);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

export default router;