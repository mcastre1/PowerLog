import Constants from "expo-constants";
import { Account, Client, Databases } from "react-native-appwrite";

const client = new Client();
const {appwriteEndpoint, appwriteProjectId} = Constants.expoConfig?.extra || {};

client
.setEndpoint(appwriteEndpoint)
.setProject(appwriteProjectId)

export const account = new Account(client);
export const databases = new Databases(client);