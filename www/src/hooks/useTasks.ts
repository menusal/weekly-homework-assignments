import React, { useCallback, useEffect } from "react";
import {
  addDocumentToCollectionTasks,
  deleteDocumentFromCollectionTasks,
  getDocumentsFromCollectionTasks,
} from "../data/services/tasksServices";

export default function useTasks(uid?: string) {
  const [tasks, setTasks] = React.useState([]);

  const setDocuments = useCallback(async () => {
    getDocumentsFromCollectionTasks().then((docs) => {
      const tasks = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTasks(tasks);
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

      setDocuments();
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    await deleteDocumentFromCollectionTasks(id);
    setDocuments();
  }, []);

  useEffect(() => {
    setDocuments();

    return () => {
      setTasks([]);
    };
  }, []);

  return { tasks, addTask, deleteTask };
}
