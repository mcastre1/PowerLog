import { account } from '@/lib/appwrite';
import * as Linking from "expo-linking";
import { Pressable, Text } from "react-native";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const redirectUrl = Linking.createURL("/auth/callback");

    try {
      await account.createOAuth2Session(
        "google",
        redirectUrl,
        redirectUrl
      );
    } catch (err) {
      console.log("OAuth error:", err);
    }
  };

  return (
    <Pressable
      onPress={handleGoogleLogin}
      style={{
        backgroundColor: "#4285F4",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        Sign in with Google
      </Text>
    </Pressable>
  );
}
