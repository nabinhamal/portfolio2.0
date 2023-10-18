import express from 'express';
import { createContact, deleteContact, getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post('/create-contact', createContact);
router.delete('/contacts/:id', deleteContact);
router.get('/contacts', getAllContacts);

export default router;
