import { decode } from "hono/jwt";

import { auth0 } from "./auth0";
import { ApiKeyService } from "@/services/api_key.service";

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
        userId = decoded.payload.sub as string;
    } else if (type === "API_KEY") {
        const apiKey = await ApiKeyService.getKeyByCreds(token);
        if (!apiKey) {
            throw new Error("Invalid API key");
        }
        userId = apiKey.user_id;
    }
    
    return {
        user_id: userId
    };
}