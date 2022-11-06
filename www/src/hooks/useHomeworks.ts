import React, { useCallback, useEffect } from "react";
import {
  addDocumentToCollectionHomeworks,
  deleteDocumentFromCollectionHomeworks,
  getDocumentsFromCollectionHomeworks,
} from "../data/services/homerworksServices";

export default function useHomeworks(uid?: string) {
  const [homeworks, setHomeworks] = React.useState([]);

  const setDocuments = useCallback(async () => {
    getDocumentsFromCollectionHomeworks().then((docs) => {
      const homeworks = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setHomeworks(homeworks);
    });
  }, []);

  const addHomework = useCallback(
    async ({
      description,
      benefit,
    }: {
      description: string;
      benefit: number;
    }) => {
      await addDocumentToCollectionHomeworks({
        description,
        benefit,
      });

      setDocuments();
    },
    []
  );

  const deleteHomework = useCallback(async (id: string) => {
    await deleteDocumentFromCollectionHomeworks(id);
    setDocuments();
  }, []);

  useEffect(() => {
    setDocuments();

    return () => {
      setHomeworks([]);
    };
  }, []);

  return { homeworks, addHomework, deleteHomework };
}
