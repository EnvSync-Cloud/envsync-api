import { decode } from "hono/jwt";

import { auth0 } from "./auth0";
import { ApiKeyService } from "@/services/api_key.service";
import { UserService } from "@/services/user.service";

export const validateAccess = async (
    {
        token,
        type
    } : {
        token: string;
        type: "JWT" | "API_KEY";
    }
) : Promise<{
    user_id: string;
}> => {
    let userId: string = "";

    if (type === "JWT") {
        await auth0.oauth.idTokenValidator.validate(token);
        const decoded = decode(token);
        let auth0UserId = decoded.payload.sub as string;

        const user = await UserService.getUserByAuth0Id(auth0UserId);    
        userId = user.id;
    } else if (type === "API_KEY") {
        const apiKey = await ApiKeyService.getKeyByCreds(token);
        console.log("API Key:", apiKey);
        if (!apiKey) {
            throw new Error("Invalid API key");
        }
        userId = apiKey.user_id;
    }

    return {
        user_id: userId
    };
}