import { User } from "../models/User.js";
import {Notes} from "../models/Notes.js";


export const createNote = async (req, res) => {
    try {
        const newNote = new Notes(req.body);
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUserAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({userId:req.params.id});
        res.status(200).json(notes)

    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateNote = async (req, res) => {
    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,          // note ID from URL
            { $set: req.body },     // update fields with request body
            { new: true }           // return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


