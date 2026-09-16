import { Google } from "arctic";
import serverConfig from "./server.config";

export const google=new Google(
    serverConfig.GOOGLE_CLIENT_ID as string,
    serverConfig.GOOGLE_CLIENT_SECRET as string,
    "http://localhost:3000/google/callback"
);