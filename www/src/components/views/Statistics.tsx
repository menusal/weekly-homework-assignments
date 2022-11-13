import { motion } from "framer-motion";
import useStatistics from "../../hooks/useStatistics";
import Counter from "../common/Counter";
import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import JSConfetti from "js-confetti";
import useSound from "use-sound";
import tada from "../../assets/tada.mp3";

const jsConfetti = new JSConfetti();

export default function Statistics() {
  const { totalSaved, historicData } = useStatistics();
  const [play] = useSound(tada);

  const celebrate = () => {
    jsConfetti.addConfetti({
      emojis: ["🐧​", "🐥​", "🐓​", "🐓​", "🐖​", "🦨"],
    });
    play();
  };

  useEffect(() => {
    setTimeout(() => {
      celebrate();
    }, 3200);
  }, []);
  console.log(historicData);
  return (
    <>
      {/* <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700"> */}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="container mx-auto  max-w-lg py-5">
          <p className="text-2xl text-white font-bold">Statistics</p>
        </div>
      </motion.div>
      {/* </div> */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container "
      >
        <div className="overflow-auto max-w-6xl bg-white h-screen p-6">
          <div className="py-2 inline-block min-w-full">
            <div className="flex flex-col md:flex-row items-center w-full">
              <p className="text-2xl px-12">Your saved money</p>
            </div>

            <Counter from={0} to={totalSaved} />

            <ReactECharts option={historicData} className="w-full" />

            <table className="min-w-full">
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
                {Object.keys(historicData).length > 0 &&
                  // @ts-ignore
                  historicData.series[0].data.map((value: number, index) => (
                    <tr
                      key={index}
                      className="border-b cursor-pointer"
                      // @ts-ignore
                      onClick={() => handleDeleteHomework(homework.id)}
                    >
                      <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {/* @ts-ignore */}
                        {historicData.xAxis.data[index]}
                      </td>
                      {/* @ts-ignore */}
                      <td
                        align="right"
                        className="text-lg font-bold text-gray-900 px-6 py-4 whitespace-nowrap"
                      >
                        {value} €
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button
              onClick={celebrate}
              className="mb-96 transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-indigo-900 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full  text-white"
            >
              Celebrate again
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
