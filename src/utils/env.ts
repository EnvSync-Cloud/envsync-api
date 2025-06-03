import { z } from 'zod';

export const env = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),
	PORT: z.string(),
	DB_LOGGING: z.string().default('false'),
	DB_AUTO_MIGRATE: z.string().default('false'),
	DATABASE_SSL: z.string().default('false'),
	// Database configuration
	DATABASE_HOST: z.string(),
	DATABASE_PORT: z.string(),
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_NAME: z.string(),
	// S3 configuration
	S3_BUCKET: z.string(),
	S3_REGION: z.string(),
	S3_ACCESS_KEY: z.string(),
	S3_SECRET_KEY: z.string(),
	S3_BUCKET_URL: z.string(),
	S3_ENDPOINT: z.string(),
	// Redis configuration
	CACHE_ENV: z.string().optional(),
	REDIS_URL: z.string().optional(),
	// SES configuration
	SES_REGION: z.string(),
	SES_ACCESS_KEY: z.string(),
	SES_SECRET_KEY: z.string(),
	SES_FROM_EMAIL: z.string(),
	// Auth0 configuration
	AUTH0_DOMAIN: z.string(),
	AUTH0_CLIENT_ID: z.string(),
	AUTH0_CLIENT_SECRET: z.string(),
	AUTH0_ISSUER_BASE_URL: z.string(),
	AUTH0_MANAGEMENT_CLIENT_ID: z.string(),
	AUTH0_MANAGEMENT_CLIENT_SECRET: z.string(),
});

export type Env = z.infer<typeof env>;

/**
 * Get parsed the environment variables
 */
export const config = env.parse(process.env);