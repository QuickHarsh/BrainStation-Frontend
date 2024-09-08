import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" flex flex-grow items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded bg-primary-blue px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
