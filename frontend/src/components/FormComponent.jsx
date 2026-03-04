import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router"

export const FormComponent = ({handleSubmitEvent,handleChange,formData,loading ,isEditMode})=>{
    return(
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      {/* Back Button */}
      <Link to={"/"} className="btn btn-ghost mb-4">
      <ArrowLeftIcon className="size-5" />Back to Notes
      </Link>

      {/* Card */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">{isEditMode ? "Edit Note":"Create New Note"}</h2>
          

        {<form className="space-y-4" onSubmit={handleSubmitEvent}>
            {/* Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input required id="title" name="title" type="text" placeholder="Enter note title..."
              className="input input-bordered w-full" value={formData.title} onChange={handleChange}/>
            </div>

            {/* Subject */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Subject</span>
              </label>
              <input required id="subject" name="subject" type="text" placeholder="Enter subject..."
               className="input input-bordered w-full" value={formData.subject} onChange={handleChange}/>
            </div>

            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select required id="category" name="category" className="select select-bordered w-full" 
              value={formData.category} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>

            {/* Content */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea required id="content" name="content" rows="5" placeholder="Write your note here..." 
              className="textarea textarea-bordered w-full" value={formData.content} onChange={handleChange} />
            </div>

            {/* Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-success" id="isCompleted" name="isCompleted" 
                checked={formData.isCompleted} onChange={handleChange} />
                <span className="label-text font-medium">
                Mark as completed
                </span>
              </label>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-4">
            <button className="btn btn-success px-8" type="submit" disabled={loading} >
                {loading ? isEditMode ? "Updating..":"Creating..":isEditMode? "Update Note" : "Create Note"}
            </button>
            </div>
          </form>}
          </div>
      </div>
    </div>
  </div>
    )
}