import express from 'express';
import { serviceController } from './service.controller';

const router = express.Router();
router.post('/create-service', serviceController.createService);
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getSingleService);
router.patch('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export const serviceRoutes = router;
