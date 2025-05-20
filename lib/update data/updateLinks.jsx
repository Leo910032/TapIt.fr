import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession, removeSessionCookie, getSessionCookie } from "../authentication/session";

export async function updateLinks(arrayOfLinks) {
    try {
        const username = testForActiveSession();
        if (!username) {
            throw new Error("User not authenticated");
        }
        
        const AccountDocRef = collection(fireApp, "AccountData");
        const docRef = doc(AccountDocRef, `${username}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const previousData = docSnap.data();
            const objectToUpdate = {...previousData, links: arrayOfLinks};
            await setDoc(docRef, objectToUpdate);
            return true;
        } else {
            // If document doesn't exist, create it
            await setDoc(docRef, {links: arrayOfLinks});
            return true;
        }
    } catch (error) {
        console.error("Error updating links:", error);
        
        // Handle permission errors by redirecting to login
        if (error.code === 'permission-denied') {
            // Invalid session - clear it and redirect
            removeSessionCookie("adminLinker");
            if (typeof window !== 'undefined') {
                window.location.href = "/login";
            }
        }
        
        throw error; // Re-throw for the caller to handle
    }
}