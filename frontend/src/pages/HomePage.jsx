import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import api from '../lib/axios';
import toast from "react-hot-toast";
import NoteCard from '../components/NoteCard';
import CategoryListing from '../components/CategoryListing';
 

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); 

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load notes");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  },[]);

  // Filter + search + sort logic
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchData.toLowerCase()) || note.subject.toLowerCase().includes(searchData.toLowerCase())
    )
    .filter((note) => {
      if (filterStatus === "completed") return note.isCompleted === true;
      if (filterStatus === "pending") return note.isCompleted === false;
      return true;
    })
    .sort((a, b) => {
      if (filterStatus === "asc") return a.title.localeCompare(b.title);
      if (filterStatus === "desc") return b.title.localeCompare(a.title);
      return 0;
    });

  // Group notes by category for "By Category" view
  const groupedNotes = filteredNotes.reduce((acc, note) => {
    const category = note.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(note);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="p-4">
        <Searchbar searchData={searchData} setSearchData={setSearchData} filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center h-[70vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="flex justify-center mt-10">
            <h1 className="text-error font-semibold text-lg">{error}</h1>
          </div>
        )}

        {/* NOTES */}
        {!loading && !error && (
          filterStatus === "category" ? (
            <CategoryListing groupedNotes={groupedNotes} setNotes={setNotes} />
          ) : (
            <ul className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNotes.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No notes found</p>
              )}

              {filteredNotes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;