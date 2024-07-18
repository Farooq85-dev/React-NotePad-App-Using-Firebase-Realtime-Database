// Import Context
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  auth,
  getDoc,
  db,
  onSnapshot,
  doc,
  collection,
  query,
} from "../../config/firebase.config";

// Create UserContext
const UserContext = createContext();

// Provide Hook to the User Context
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUserNotes, setAllUserNotes] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Getting User Image
        const userImageDocRef = doc(db, "usersImages", currentUser.uid);
        const userImageDocSnap = await getDoc(userImageDocRef);
        const userImageUrl = userImageDocSnap.exists()
          ? userImageDocSnap.data().downloadURL
          : null;

        // Getting User Notes
        const q = query(collection(db, "usersNotes", currentUser.uid, "notes"));
        const unsubscribeNotes = onSnapshot(q, (snapshot) => {
          const notes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllUserNotes(notes);

          // Set user with updated notes
          setUser({
            userUid: currentUser.uid,
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            userImage: userImageUrl,
            allUserNotes: notes, // Use the latest notes
          });
        });

        // Cleanup notes subscription when the auth state changes
        return () => unsubscribeNotes();
      } else {
        setUser(null);
      }
    });

    // Cleanup auth subscription on unmount
    return () => unsubscribeAuth();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
