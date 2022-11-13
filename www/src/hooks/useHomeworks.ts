import React, { useCallback, useEffect } from "react";
import {
  addDocumentToCollectionHomeworks,
  deleteDocumentFromCollectionHomeworks,
  getDocumentsFromCollectionHomeworks,
} from "../data/services/homerworksServices";

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export default function useHomeworks(uid?: string) {
  const [homeworks, setHomeworks] = React.useState([]);

  const setDocuments = useCallback(async () => {
    getDocumentsFromCollectionHomeworks().then((docs) => {
      const homeworks = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      const oerderByDescription = homeworks.sort((a, b) => {
        // @ts-ignore
        if (a.description < b.description) {
          return -1;
        }
        // @ts-ignore
        if (a.description > b.description) {
          return 1;
        }
        return 0;
      });
      // @ts-ignore
      setHomeworks(oerderByDescription);
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
