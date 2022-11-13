import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
      <div className="max-w-md">
        <div className="text-8xl font-extrabold font-bold text-white">404</div>
        <p className="text-2xl md:text-3xl font-light leading-normal text-white">
          Sorry we couldn&apos;t find this page.{" "}
        </p>
        <p className="mb-8 text-white">
          But dont worry, you can find plenty of other things on our homepage.
        </p>

        <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-900 active:bg-blue-600 hover:bg-blue-700">
          <Link to="/login">Header to homepage</Link>
        </button>
      </div>
      <div className="max-w-lg"></div>
    </div>
  );
}
