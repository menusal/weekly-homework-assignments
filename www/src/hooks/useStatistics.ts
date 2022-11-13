import { useCallback, useEffect, useState } from "react";
import { OrderTypes } from "../config";
import { getDocumentsFromCollectionTasks } from "../data/services/tasksServices";
import { getOrderedTasks } from "../utils/tasks.utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function useStatistics() {
  const [totalSaved, setTotalSaved] = useState(0);
  const [historicData, setHistoricData] = useState({});

  const getTotalSavedFromTasks = useCallback(async () => {
    getDocumentsFromCollectionTasks().then((docs) => {
      const tasks = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      let totalSaved = 0;
      tasks.forEach((task: any) => {
        totalSaved += task.homework.benefit;
      });
      setTotalSaved(totalSaved);

      const orderedTasks = getOrderedTasks(tasks, OrderTypes.ASC);

      // Group by month
      const groupedByMonth = orderedTasks.reduce((acc: any, task: any) => {
        const month = Number(task.date.split("-")[1]);
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(task);
        return acc;
      }, {});

      setHistoricData({
        xAxis: {
          type: "category",
          data: Object.keys(groupedByMonth).map(
            (month: any) => MONTHS[month - 1]
          ),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Object.values(groupedByMonth).map((month: any) => {
              let totalSaved = 0;
              month.forEach((task: any) => {
                totalSaved += task.homework.benefit;
              });
              return totalSaved;
            }),
            color: "#4ade80",
            type: "bar",
          },
        ],
      });
    });

    //   setHistoricData({
    //     xAxis: {
    //       type: "category",
    //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //     },
    //     yAxis: {
    //       type: "value",
    //     },
    //     series: [
    //       {
    //         data: [120, 200, 150, 80, 70, 110, 130],
    //         type: "bar",
    //       },
    //     ],
    //   });
  }, []);

  useEffect(() => {
    getTotalSavedFromTasks();
    return () => {
      setTotalSaved(0);
    };
  }, []);

  return { totalSaved, historicData };
}
