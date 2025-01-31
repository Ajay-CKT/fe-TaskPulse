import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../redux/features/auth/userSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="h-20 px-2 md:px-4 shadow-md rounded-b-2xl flex flex-row justify-between items-center relative">
        <Link to="/" onClick={() => setShowMenu(false)}>
          <div className="h-12 md:h-18 z-50">
            <img
              src="/logo/taskpulse-logo.svg"
              alt="taskpulse-logo"
              className="h-full w-full rounded-xl hover:cursor-pointer"
            />
          </div>
        </Link>
        <div className="flex flex-row justify-center items-center gap-2 h-10">
          {!user && (
            <div className="hidden md:flex md:flex-row md:items-center md:gap-4">
              <Link to="/register">
                <button className="p-2 w-26 text-center rounded-lg hover:border-b hover:border-b-orange-500 hover:cursor-pointer hover:shadow-md">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="p-2 w-20 text-center bg-orange-400 rounded-lg hover:bg-orange-500 hover:cursor-pointer hover:shadow-lg">
                  Login
                </button>
              </Link>
            </div>
          )}
          {user && (
            <div className="hidden md:flex md:flex-row md:items-center md:gap-4">
              <Link to="/logout">
                <button
                  onClick={() => navigate("/logout", { replace: true })}
                  className="p-2 w-26 text-center rounded-lg bg-orange-400 hover:bg-orange-500 hover:cursor-pointer hover:shadow-md"
                >
                  Logout
                </button>
              </Link>
            </div>
          )}
          <div className="p-2 size-10 rounded-lg hover:cursor-pointer md:hidden">
            <button onClick={handleMenu}>
              <img src="/icons/menu.png" alt="" className="size-full" />
            </button>
          </div>
          {/* <button className="p-2 size-10 rounded-lg hover:cursor-pointer">
            <img src="/icons/menu.png" alt="" className="size-full" />
          </button> */}
        </div>
      </nav>
      {showMenu && !user && (
        <div className="h-screen w-full pt-10 pl-10 text-xl flex flex-col items-start gap-8 bg-orange-400 absolute top-18 font-display-3">
          <Link
            to="/register"
            onClick={() => setShowMenu(false)}
            className="hover:border-b-2 hover:border-b-orange-800 hover:w-3/4 hover:transition hover:duration-350"
          >
            Register
          </Link>
          <Link
            to="/login"
            onClick={() => setShowMenu(false)}
            className="hover:border-b-2 hover:border-b-orange-800 hover:w-3/4 hover:transition hover:duration-350"
          >
            Login
          </Link>
          <Link
            to="/"
            onClick={() => setShowMenu(false)}
            className="hover:border-b-2 hover:border-b-orange-800 hover:w-3/4 hover:transition hover:duration-350"
          >
            Back to home
          </Link>
        </div>
      )}
      {showMenu && user && (
        <div className="h-screen w-full pt-10 pl-10 text-xl flex flex-col items-start gap-8 bg-orange-400 absolute top-18">
          <Link
            to="/logout"
            onClick={() => {
              setShowMenu(false);
              navigate("/logout", { replace: true });
            }}
            className="hover:border-b-2 hover:border-b-orange-800 hover:w-3/4 hover:transition hover:duration-350"
          >
            Logout
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
