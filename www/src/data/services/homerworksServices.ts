import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { collection, db, query } from "../../firebase";

// get homeworks from firebase
export async function getDocumentsFromCollectionHomeworks() {
  const q = await query(collection(db, "homeworks"));
  return getDocs(q);
}

export async function addDocumentToCollectionHomeworks({
  description,
  benefit,
}: {
  description: string;
  benefit: number;
}) {
  await addDoc(collection(db, "homeworks"), {
    description,
    benefit,
  });
}

export async function deleteDocumentFromCollectionHomeworks(id: string) {
  await deleteDoc(doc(db, "homeworks", id));
}