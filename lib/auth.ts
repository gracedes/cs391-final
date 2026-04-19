import {betterAuth} from "better-auth";
import {mongodbAdapter} from "@better-auth/mongo-adapter";
import {mongoDb} from "@/lib/db";

export const auth = betterAuth({
    database: mongodbAdapter(mongoDb),
    user: {
        additionalFields: {
            following: {
                type: "string",
                defaultValue: [],
            },
            username: {
                type: "string",
                defaultValue: "",
                input: true,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});