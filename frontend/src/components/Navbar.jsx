import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 min-h-12 px-3 sticky top-0 z-50 shadow-md">

      {/* LEFT ICON */}
      <div className="flex-none">
        <button className="btn btn-ghost btn-circle btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v13m0-13c-3 0-6 1-8 2v13c2-1 5-2 8-2s6 1 8 2V8c-2-1-5-2-8-2z"
            />
          </svg>
        </button>
      </div>

      {/* TITLE */}
      <div className="flex-1">
        <a className="btn btn-ghost text-base font-semibold normal-case">
          NoteManager
        </a>
      </div>

      {/* BUTTON */}
      <div className="flex-none">
        <button
          className="btn btn-sm rounded-md transition-all btn-primary text-white"
          onClick={() => navigate("/create")}
        >
          <span className="sm:hidden">＋</span>
          <span className="hidden sm:inline">Create Note</span>
        </button>
      </div>

    </div>
  );
};

export default Navbar;