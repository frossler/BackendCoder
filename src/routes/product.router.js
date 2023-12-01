import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

// // File Import Endpoint
router.get('/:id', controller.getById);

router.get('/', controller.getAll);

router.post('/file', controller.createFileController);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

export default router;