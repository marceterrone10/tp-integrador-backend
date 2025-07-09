import { Router } from 'express';
import { viewList, viewListConsultById, viewCreate, viewUpdate, viewDelete } from '../controllers/view.controllers.js';


const router = Router();

//vistas
router.get("/", viewList);

router.get("/consultar", viewListConsultById);

router.get("/crear", viewCreate);

router.get("/actualizar", viewUpdate);

router.get("/eliminar", viewDelete);

export default router;