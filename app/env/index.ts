import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string(),
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: z.string(),
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: z.string(),
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: z.string(),
})

type EnvType = z.infer<typeof envSchema>

function getEnv(): EnvType {
  const _env = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
      NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
        process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  }


  const result = envSchema.safeParse(_env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format())
    throw new Error('Invalid environment variables')
  }

  return result.data
}

export const env = getEnv()
