import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export default function Task() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="container mx-auto  max-w-lg">
          <p className="text-4xl text-gray-400 dark:text-white font-bold mb-5">
            Register new task
          </p>
        </div>
      </motion.div>
    </div>
  );
}
