import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

// // File Import Endpoint
router.post('/file', controller.createFileController);

// // Aggregate Routes
router.get("/pipelineCategory", controller.aggregationCategory);

router.get("/pipelinePrice", controller.aggregationPrice);

// // CRUD Routes
router.get('/id/:id', controller.getById);

router.get('/all', controller.getAll);

router.get('/', controller.getAll);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

export default router;