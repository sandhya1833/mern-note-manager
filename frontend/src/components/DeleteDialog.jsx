import { Trash2 } from "lucide-react"
 

export const DeleteDialog = ({title,setShowModal,handleDeleteEvent}) =>{
    
    return (
        <dialog className="modal modal-open fixed inset-0 z-50">

          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Note
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete
              <span className="font-semibold text-base-content">{" "}"{title}"</span>? <br />
              This action cannot be undone.
            </p>

            <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
            Cancel
            </button>

            <button className="btn btn-error flex items-center gap-2" onClick={handleDeleteEvent}>
            <Trash2 className="size-4" /> Delete
            </button>
            </div>
          </div>
        </dialog>
      )
}