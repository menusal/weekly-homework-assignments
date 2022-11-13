import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useHomeworks from "../../hooks/useHomeworks";
import { Item } from "../../types";

export default function Homework() {
  const [user] = useAuthState(auth);
  const [errors, setErrors] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [benefit, setBenefit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentHomework, setCurrentHomework] = useState("");
  
  const { homeworks, addHomework, deleteHomework } = useHomeworks(user?.uid);

  const handleAddHomework = async () => {
    if (description.length === 0) {
      setErrors(["Description is required"]);
      return;
    }

    if (Number(benefit) === 0 || benefit.length === 0) {
      setErrors(["Benefit must be greater than 0"]);
      return;
    }

    setLoading(true);

    await addHomework({
      description,
      benefit: Number(benefit),
    });

    setLoading(false);
    setDescription("");
    setBenefit("");
  };

  const handleDeleteHomework = async (id: string) => {
    setCurrentHomework(id);
    setShowModal(true);
  };

  const confirmDeleteHomework = async () => {
    await deleteHomework(currentHomework);
    setShowModal(false);
  };

  return (
    <>
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="container mx-auto max-w-lg py-5">
            <p className="text-2xl text-white font-bold">Homeworks</p>
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
            <p className="text-gray-900 text-2xl text-left p-6">New Homework</p>
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
              <label htmlFor="benefit">Benefit (in €)</label>
              <input
                id="benefit"
                type="number"
                value={benefit}
                placeholder="0"
                max={100}
                min={0}
                // @ts-ignore
                onChange={(e) => setBenefit(Number(e.target.value))}
                className="form-input px-4 py-3 rounded-md w-full mb-4"
              />
              <button
                disabled={loading}
                onClick={handleAddHomework}
                className="transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mb-4 text-white"
              >
                Add homework
              </button>
            </div>
            <div className="overflow-hidden">
              <p className="text-gray-900 text-2xl text-left p-6">
                Registered homeworks
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
                        Benefit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeworks.map((homework: Item, index) => (
                      <tr
                        key={index}
                        className="border-b cursor-pointer"
                        // @ts-ignore
                        onClick={() => handleDeleteHomework(homework.id)}
                      >
                        <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {homework.description as ReactNode}
                        </td>
                        {/* @ts-ignore */}
                        <td
                          align="right"
                          className="text-lg font-bold text-gray-900 px-6 py-4 whitespace-nowrap"
                        >
                          {homework.benefit} €
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
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    If you delete this homework, you will not be able to recover
                    it and all the related task will be deleted too.
                  </p>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                    type="button"
                    onClick={confirmDeleteHomework}
                  >
                    Delete homework
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
