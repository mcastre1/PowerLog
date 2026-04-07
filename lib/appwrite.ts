import { Account, Client, Databases } from "appwrite";
import Constants from "expo-constants";

const client = new Client();
const {appwriteEndpoint, appwriteProjectId} = Constants.expoConfig?.extra || {};

client
.setEndpoint(appwriteEndpoint)
.setProject(appwriteProjectId)

export const account = new Account(client);
export const databases = new Databases(client);