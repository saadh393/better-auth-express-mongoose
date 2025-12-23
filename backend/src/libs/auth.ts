import { passkey } from "@better-auth/passkey";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { multiSession } from "better-auth/plugins";
import { getMongoClient } from "./database";

let authInstance = null;

export default async function getAuth(){
    if(authInstance) return authInstance;

    const client = await getMongoClient()
    authInstance = betterAuth({
        database : mongodbAdapter(client),
        trustedOrigins : [process.env.CORS_ORIGINS],
        emailAndPassword : {
            enabled : true
        },
        plugins : [
            passkey(),
            multiSession()
        ]
    });

    return authInstance;
}