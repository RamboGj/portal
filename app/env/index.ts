import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string(),
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    CONTENTFUL_ENVIRONMENT: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
})

type EnvType = z.infer<typeof envSchema>

function getEnv(): EnvType {
  const _env = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    CONTENTFUL_ACCESS_TOKEN:
      process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_SPACE_ID:
        process.env.CONTENTFUL_SPACE_ID,
  }


  const result = envSchema.safeParse(_env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format())
    throw new Error('Invalid environment variables')
  }

  return result.data
}

export const env = getEnv()
