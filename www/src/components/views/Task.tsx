import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useHomeworks from "../../hooks/useHomeworks";
import useTasks from "../../hooks/useTasks";
import JSConfetti from "js-confetti";
import useSound from "use-sound";
import tada from "../../assets/tada.mp3";
import { Item } from "../../types";

const jsConfetti = new JSConfetti();

export default function Task() {
  const [user] = useAuthState(auth);
  const [errors, setErrors] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [homework, setHomework] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [play] = useSound(tada);

  const { tasks, addTask, deleteTask } = useTasks(user?.uid);
  const { homeworks } = useHomeworks(user?.uid);

  const totalBenefit = tasks.reduce((acc, task: Item) => {
    // @ts-ignore
    return acc + task?.homework?.benefit;
  }, 0);

  const celebrate = () => {
    jsConfetti.addConfetti({
      emojis: ["๐งโ", "๐ฅโ", "๐โ", "๐โ", "๐โ", "๐ฆจ"],
    });
    play();
  };

  const handleAddTask = async () => {
    if (description.length === 0) {
      setErrors(["Description is required"]);
      return;
    }

    if (date.length === 0) {
      setErrors(["Date is required"]);
      return;
    }

    if (homework === null) {
      setErrors(["Homework is required"]);
      return;
    }

    const currentHomework = homeworks.find((row: any) => row.id === homework);

    setLoading(true);

    await addTask({
      description,
      date,
      homework: currentHomework,
    });

    setLoading(false);
    setDescription("");
    setHomework("");

    celebrate();
  };

  const handleDeleteTask = async (id: string) => {
    setCurrentTask(id);
    setShowModal(true);
  };

  const confirmDeleteTask = async () => {
    await deleteTask(currentTask);
    setShowModal(false);
  };

  return (
    <>
      <div className="container flex flex-col md:flex-row items-center justify-center px-6 text-gray-700">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="container mx-auto  max-w-lg">
            <p className="text-2xl text-white font-bold py-5">
              Tasks - (โฌ{totalBenefit})
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="overflow-auto max-w-6xl bg-white h-screen">
          <div className="py-2 inline-block min-w-full">
            <p className="text-gray-900 text-2xl text-left p-6">New Task</p>
            <div className="py-1 px-6">
              {errors.length > 0 && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">
                    Plase, fix the errors to add a new homerwork.
                  </strong>
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm py-2">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <label htmlFor="description">Date</label>
              <input
                id="date"
                type="date"
                autoComplete="off"
                onChange={(e) => setDate(e.target.value)}
                className="form-input px-4 py-3 rounded-md w-full mb-4"
              />
              <label htmlFor="description">homework</label>
              <select
                value={homework}
                onChange={(e) => {
                  setHomework(e.target.value);
                }}
                className="form-select px-4 py-3 rounded-md w-full mb-4"
              >
                <option value="">Select homework</option>
                {homeworks.map((homework) => (
                  // @ts-ignore
                  <option key={homework.id} value={homework.id}>
                    {/* @ts-ignore */}
                    {homework.description}
                  </option>
                ))}
              </select>

              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                value={description}
                placeholder="Type the description"
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
                className="form-input px-4 py-3 rounded-md w-full mb-4"
              />

              <button
                disabled={loading}
                onClick={handleAddTask}
                className="transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mb-4 text-white"
              >
                Add task
              </button>
            </div>
            <div className="overflow-hidden">
              <p className="text-gray-900 text-2xl text-left p-6">
                Registered tasks
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <table className="min-w-full mb-96">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr
                        key={index}
                        className="border-b cursor-pointer"
                        // @ts-ignore
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {/* @ts-ignore */}
                          <span className="text-xs">{task.date}</span>
                          {/* @ts-ignore */}
                          <br /> {task.homework.description}
                        </td>
                        <td
                          align="right"
                          className="text-lg font-bold text-gray-900 px-6 py-4 whitespace-nowrap"
                        >
                          {/* @ts-ignore */}
                          โฌ{task.homework.benefit}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>



              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Actions</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ร
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    If you delete this task, you will not be able to recover.
                    Are you sure you want to delete it?
                  </p>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                    type="button"
                    onClick={confirmDeleteTask}
                  >
                    Delete task
                  </button>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
