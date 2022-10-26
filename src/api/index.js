import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000'});

export const signIn =(formData) => API.post(`/user/signin`, formData)
export const signUp =(formData) => API.post(`/user/signup`, formData)

export const createNote = (noteData, config) => API.post('/notes/create', noteData, config);
export const fetchNotes = (config) => API.get(`/notes`, config);
export const updateNotes = (currentId, noteData, config)=> API.put(`notes/${currentId}`, noteData, config);
export const deleteNote = (id, config) => API.delete(`notes/${id}`, config);