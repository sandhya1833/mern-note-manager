import express from "express"
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById} from "../controller/noteController.js";

const router = express.Router();

router.get("/",getAllNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id",updateNoteById);
router.delete("/:id",deleteNoteById);

export default router;