import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { ROUTES } from "../../App";
import { auth } from "../../firebase";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="container mx-auto  max-w-lg">
          <p className="text-4xl text-white font-bold mb-5">
            <span className="text-gray-100">W</span>
            <span className="text-gray-400">eekly</span> <br />
            <span className="text-gray-100">H</span>
            <span className="text-gray-400">omework</span> <br />
            <span className="text-gray-100">A</span>
            <span className="text-gray-400">ssignments</span>
            <br />
          </p>

          <p className="text-2xl text-white font-bold mb-5">
            Welcome {user?.displayName}
          </p>
          <p className="text-gray-300 text-lg">Any homework to register?</p>
        </div>
      </motion.div>

      <div className="container mx-auto text-center max-w-lg mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={ROUTES.TASK}
            aria-label="Continue with google"
            role="button"
            className="transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mb-4"
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
                d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="text-base font-medium ml-4 text-gray-700 text-white">
              Register task
            </p>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to={ROUTES.HOMEWORK}
            aria-label="Continue with google"
            role="button"
            className="transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mb-4"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <p className="text-base font-medium ml-4 text-gray-700 text-white">
              Homeworks
            </p>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to={ROUTES.STATISTICS}
            aria-label="Continue with google"
            role="button"
            className="transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
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
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>

            <p className="text-base font-medium ml-4 text-gray-700 text-white">
              Show Statistics
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
