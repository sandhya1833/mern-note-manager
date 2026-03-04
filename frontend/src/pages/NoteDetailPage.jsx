import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { formateDate } from "../lib/utils";
import { ArrowLeftIcon, Edit2, Trash2 } from "lucide-react";
import { DeleteDialog } from "../components/DeleteDialog";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const navigate = useNavigate();

  const fetchNoteById = async () => {
    try {
      const res = await api.get(`/notes/${id}`);
      setNote(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteById();
  }, []);

  // DELETE NOTE
  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    } finally {
      setShowModel(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center min-h-[80vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="alert alert-error shadow-lg">
            <span className="break-words">{error}</span>
          </div>
        </div>
      )}

      {/* NOTE */}
      {!loading && !error && (
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4">
          
          {/* BACK BUTTON */}
          <Link
            to="/"
            className="btn btn-xs sm:btn-sm btn-ghost mb-4"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body max-w-full overflow-x-hidden space-y-4">

              {/* HEADER */}
              <div className="flex justify-between items-start flex-wrap gap-3">
                <span className="badge badge-primary badge-outline capitalize break-words">
                  {note.category}
                </span>

                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => navigate(`/edit/${id}`)}
                  >
                    <Edit2 className="size-4 text-warning" />
                  </button>

                  <button
                    className="btn btn-sm btn-ghost text-error"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModel(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {showModel && (
                <DeleteDialog
                  title={note.title}
                  handleDeleteEvent={handleDeleteEvent}
                  setShowModel={setShowModel}
                />
              )}

              {/* TITLE */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words first-letter:uppercase">
                <span className="font-semibold">Title :</span>{" "}
                {note.title}
              </h1>

              {/* SUBJECT */}
              <p className="text-sm sm:text-base opacity-80 break-words">
                <span className="font-semibold">Subject :</span>{" "}
                {note.subject}
              </p>

              <hr />

              {/* CONTENT */}
              <div>
                <p className="text-sm sm:text-base opacity-80 mb-1">
                  Content :
                </p>

                <p className="leading-relaxed text-sm sm:text-base break-words whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>

              <hr />

              {/* DATES */}
              <div className="text-xs sm:text-sm opacity-70 space-y-1 break-words">
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {note.createdAt &&
                    formateDate(new Date(note.createdAt))}
                </p>

                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {note.updatedAt &&
                    formateDate(new Date(note.updatedAt))}
                </p>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`badge ${
                    note.isCompleted
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {note.isCompleted ? "Completed" : "Pending"}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;