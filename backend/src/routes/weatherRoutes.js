import { Router } from 'express';
import * as weatherController from '../controllers/weatherController.js';

const router = Router();

router.get('/popular', weatherController.getPopular);
router.get('/search', weatherController.getWeather);
router.get('/:city', weatherController.getWeather);

export default router;
