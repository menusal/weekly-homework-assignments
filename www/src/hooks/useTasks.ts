import React, { useCallback, useEffect } from "react";
import { OrderTypes } from "../config";
import {
  addDocumentToCollectionTasks,
  deleteDocumentFromCollectionTasks,
  getDocumentsFromCollectionTasks,
} from "../data/services/tasksServices";
import { getOrderedTasks } from "../utils/tasks.utils";

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export default function useTasks(uid?: string) {
  const [tasks, setTasks] = React.useState([]);

  const getDocuments = useCallback(async () => {
    getDocumentsFromCollectionTasks().then((docs) => {
      const tasks = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // Order tasks by date
      const orderedTasks = getOrderedTasks(tasks, OrderTypes.DESC);

      // @ts-ignore
      setTasks(orderedTasks);
    });
  }, []);

  const addTask = useCallback(
    async ({
      description,
      date,
      homework,
    }: {
      description: string;
      date: string;
      homework: any;
    }) => {
      await addDocumentToCollectionTasks({
        description,
        date,
        homework,
      });

      getDocuments();
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    await deleteDocumentFromCollectionTasks(id);
    getDocuments();
  }, []);

  useEffect(() => {
    getDocuments();

    return () => {
      setTasks([]);
    };
  }, []);

  return { tasks, addTask, deleteTask };
}
