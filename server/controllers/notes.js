import mongoose from "mongoose";
import Notes from "../models/NotesModal.js"

export const getNotes = async(req, res) =>{
    try {
        const note = await Notes.find({ user: req.user._id });
        res.status(200).json(note);

    } catch (error) {
        res.status(400).json(error)
    }
}

export const createNote = async(req, res)=>{
    const { title, note } = req.body;

    try {
        
        if(!title || !note) return res.status(400).json({ message: "Please fill the fields" })

        const notes = new Notes({ user: req.user._id, title, note });
        const createdNotes = await notes.save();
        res.status(200).json(createdNotes);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateNote =async(req, res)=>{
    const { id } = req.params;
    const { title, note } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedNote = {title,note, _id: id };

    await Notes.findByIdAndUpdate(id, updatedNote, { new: true });

    res.json(updatedNote);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Notes.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}