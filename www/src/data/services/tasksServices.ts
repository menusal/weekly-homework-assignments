import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { collection, db, query } from "../../firebase";

// get tasks from firebase
export async function getDocumentsFromCollectionTasks() {
  const q = await query(collection(db, "tasks"));
  return getDocs(q);
}

export async function addDocumentToCollectionTasks({
  description,
  date,
  homework,
}: {
  description: string;
  date: string;
  homework: any;
}) {
  console.log({
    description,
    date,
    homework,
    validated: false,
  });
  await addDoc(collection(db, "tasks"), {
    description,
    date,
    homework,
    validated: false,
  });
}

export async function deleteDocumentFromCollectionTasks(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}
