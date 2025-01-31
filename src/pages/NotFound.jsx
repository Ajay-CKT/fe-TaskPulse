import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4 font-display-1">404 Not Found</h1>
      <p className="text-xl mb-5 font-display-4">This page does not exist</p>
      <Link
        to="/"
        className="font-display-3 p-2  mx-auto bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500  "
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFound;
