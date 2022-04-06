import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'

export const addDocument = async (collectionName, data, id) => {
  const firestore = getFirestore()

  let documentId = id
  if (id) {
    const ref = collection(firestore, collectionName)
    await setDoc(doc(ref, id), data, { merge: true })
  } else {
    const result = await addDoc(collection(firestore, collectionName), data)
    documentId = result.id
  }

  return documentId
}

export const getDocument = async (collectionName: string, id: string) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  const snapshot = await getDoc(ref)

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export const updateDocument = async (collectionName, id, data) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  await updateDoc(ref, data)
}

export const getDocuments = async (collectionName) => {
  const result = []

  const firestore = getFirestore()

  const querySnapshot = await getDocs(collection(firestore, collectionName))
  querySnapshot.forEach((item) => {
    result.push({ id: item.id, ...item.data() })
  })

  return result
}

export const deleteDocument = async (collectionName, id) => {
  const firestore = getFirestore()

  await deleteDoc(doc(firestore, collectionName, id))
}
