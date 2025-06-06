import { z } from "zod";
import jwt from "jsonwebtoken";

import { config } from "@/utils/env";

const JWKS_URL = config.AUTH0_ISSUER_BASE_URL + "/.well-known/jwks.json";

export const schema = z.object({
  keys: z.array(
    z.object({
      kty: z.string(),
      use: z.string(),
      n: z.string(),
      e: z.string(),
      kid: z.string(),
      x5t: z.string(),
      x5c: z.array(z.string()),
      alg: z.string()
    })
  )
})

const certBuilder = (x5c: string) => {
    return `-----BEGIN CERTIFICATE-----\n${x5c}\n-----END CERTIFICATE-----`;
}

const getJWKS = async () => {
    try {
        const response = await fetch(JWKS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch JWKS: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching JWKS:", error);
        throw error;
    }
};

const getJWK = async (kid: string) => {
    const jwksRaw = await getJWKS();
    const jwks = schema.parse(jwksRaw);
    const key = jwks.keys.find((k) => k.kid === kid);
    if (!key) {
        throw new Error(`JWK with kid ${kid} not found`);
    }
    return key;
};

export const verifyJWTToken = async (token: string) => {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
    }

    const header = JSON.parse(Buffer.from(parts[0], "base64").toString("utf-8"));
    const signature = parts[2];

    if (!header.kid) {
        throw new Error("JWT header does not contain 'kid'");
    }

    const jwk = await getJWK(header.kid);
    const cert = certBuilder(jwk.x5c[0]);

    return jwt.verify(token, cert, { algorithms: ['RS256'] });
}