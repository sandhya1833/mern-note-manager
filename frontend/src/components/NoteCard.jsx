import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import {useNavigate } from "react-router";
import { DeleteDialog } from "./DeleteDialog";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { _id, title, category, subject, isCompleted, createdAt } = note;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/notes/${_id}`);
      setNotes((prev) => prev.filter((n) => n._id !== _id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("error in deleting", error);
      toast.error("Failed to delete note");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* ================= CARD ================= */}
      <li
        className="card bg-base-100 shadow-md border border-base-300
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300"
      >
        <div className="card-body p-5">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <span className="badge badge-primary badge-outline capitalize">
              {category}
            </span>

            <div className="flex gap-1">
              <button className="btn btn-sm btn-ghost" onClick={()=>navigate(`/edit/${_id}`)} >
                <Edit2 className="size-4 text-warning hover:scale-110 transition"/>
              </button>

              <button className="btn btn-sm btn-ghost text-error" onClick={(e) => { e.preventDefault();setShowModal(true)}}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="card-title text-base md:text-lg mt-2 line-clamp-2">
            {title}
          </h2>

          {/* Subject */}
          <p className="text-sm opacity-70">
            Subject: <span className="font-medium">{subject}</span>
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              <span
                className={`badge ${isCompleted ? "badge-success" : "badge-warning"}`}
              >
                {isCompleted ? "Completed" : "Pending"}
              </span>

              <span className="text-xs opacity-60">{formattedDate}</span>
            </div>

            <button className="btn btn-sm btn-outline btn-primary" onClick={()=>navigate(`/note/${_id}`)} >
              View
            </button>
          </div>
        </div>
      </li>

      {/* ================= DELETE MODAL ================= */}
      {showModal && <DeleteDialog title={title} handleDeleteEvent = {handleDeleteEvent} setShowModal={setShowModal}/>}
    </>
  );
};

export default NoteCard;