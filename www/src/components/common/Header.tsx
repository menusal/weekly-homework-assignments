import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase";
import { useMatchRoutes } from "../../hooks/useMatchRoutes";

const dropdown = document.getElementById("dropdown");

export default function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { isDashboard, isLogin } = useMatchRoutes();
  const ref = useRef(null);

  const toggleDropdown = () => {
    dropdown?.classList.toggle("hidden");
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      // If dropdown has class hidden
      if (!dropdown?.classList.contains("hidden")) {
        setTimeout(() => toggleDropdown(), 500);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="fixed w-full h-8">
      <div
        ref={ref}
        id="dropdown"
        className="hidden absolute top-3 right-20 shadow-xl m-r-10 z-10 w-44 bg-indigo-900 rounded divide-y divide-gray-100 dark:bg-gray-700"
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <a
              href="#"
              onClick={logout}
              className="block py-2 px-4 flex items-center transition duration-500 ease select-none hover:bg-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <p
                className="text-base font-medium ml-4 text-white"
                
              >
                {" "}
                Logout
              </p>
            </a>
          </li>
        </ul>
      </div>
      {!isLogin && (
        <div className="absolute top-4 right-4">
          <img
            className="cursor-pointer p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 transition duration-500 ease select-none hover:ring-indigo-600"
            src={user?.photoURL || ""}
            alt="Bordered avatar"
            onClick={toggleDropdown}
          />
        </div>
      )}
      {!isDashboard && !isLogin && (
        <div className="absolute top-4 left-4">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 4, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => navigate(-1)}
              aria-label="Header"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#a1a1a1"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
