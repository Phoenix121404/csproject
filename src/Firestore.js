import { db } from "./Firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

// This is just an example of how to add data to firesore.
// We wont store user data but I don't know what exactly we will store here yet.

// When wanting to access or store data, there will need to be a collection made inside the Firebase console online.

// Add User Data to Firestore
async function addUserData(userId, name, age) {
  try {
    await addDoc(collection(db, "users"), {
      userId,
      name,
      age
    });
    console.log("User Data Added");
  } catch (error) {
    console.error("Error Adding User Data:", error);
  }
}

// Fetch User Data from Firestore
async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
}

export { addUserData, fetchUsers };
