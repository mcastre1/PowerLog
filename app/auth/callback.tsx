import * as Linking from "expo-linking";
import { useEffect } from "react";
import { account } from "../../lib/appwrite"; // wherever you initialized Appwrite

export default function AuthCallback() {
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      account.get().then((user) => {
        console.log("Logged in user:", user);
      });
    }
  }, [url]);

  return null;
}
