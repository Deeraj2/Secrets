import express from 'express';
import { createNote, deletePost, getNotes, updateNote } from '../controllers/notes.js';
import auth from '../middleware/auth.js';

const routes = express.Router();

routes.get('/', auth, getNotes);
routes.post('/create', auth, createNote);
routes.put('/:id', auth, updateNote);
routes.delete('/:id', auth, deletePost)


export default routes;