import { Router } from "express";

const router = Router();

router.patch('/:id/status')
router.get('/:id');
router.put('/:id');
router.delete('/:id');

router.get('/');
router.post('/');

export default router;