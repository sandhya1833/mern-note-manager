import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/create" element={<CreateNote />}/>
      <Route path="/note/:id" element={<NoteDetailPage/>} />
      <Route path="/edit/:id" element={<EditPage/>}/>
    </Routes>
  );
}

export default App;