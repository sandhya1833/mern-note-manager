import React from "react";
import NoteCard from "./NoteCard";

const CategoryListing = ({ groupedNotes, setNotes }) => {
  return (
    <div className="mt-6 px-4 space-y-8">
      {Object.entries(groupedNotes).map(([category, notes]) => (
        <div key={category}>
          {/* Heading */}
          <div className="flex justify-between items-center bg-base-100 rounded-md px-3 py-2 border border-indigo-400 shadow-sm">
            <h2 className="text-sm font-semibold capitalize text-indigo-600">{category}</h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded border border-indigo-300 text-indigo-600">
              {notes.length} notes
            </span>
          </div>

          {/* Cards */}
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryListing;