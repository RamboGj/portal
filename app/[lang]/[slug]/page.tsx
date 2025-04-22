import { notFound } from "next/navigation"
import { env } from "../../env"
import { AssetProps, PostFields } from "../page"
import { API_BASE_URL } from "../../utils/api"
import { BlogPostPageClient } from "./_components/client"

export interface FeatureImageProps {
  sys: {
    id: string
    linkType: 'Asset' | 'Entry'
    type: string
  }
}

export interface SEOFieldsProps {
  sys: {
    id: string
    linkType: 'Asset' | 'Entry'
    type: string
  }
}

export interface BlogPostItemsProps {
  fields: {
    content: {
      content: unknown[]
    }
    featuredImage: FeatureImageProps
    internalName: string
    publishedDate: string
    seoFields: SEOFieldsProps
    shortDescription: string
    slug: string
    title: string
  }
  metadata: {
    tags: string[]
  }
  sys: unknown
}

export interface BlogPostProps {
  includes: {
    Asset: AssetProps[]
    Entry: unknown[]
  }
  items: {
    fields: PostFields
    metadata: {
      tags: string[]
      concepts: string[]
    }
  }[]
  limit: number
  skip: number
  total: number
  sys: {
    type: string
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const response = await fetch(
    `${API_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries?content_type=blogPost&fields.slug=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      cache: 'no-cache',
    },
  )

  if (!response.ok) {
    return {
      openGraph: {
        title: 'Not found',
        description: 'Content not found',
      },
    }
  }

  const data: BlogPostProps = await response.json()

  if (data) {
    const image = data.includes.Asset.find(
      (asset) => asset.sys.id === data.items[0].fields.featuredImage.sys.id,
    )

    const imageHref = `https:${image?.fields.file.url}`

    return {
      openGraph: {
        title: data.items[0].fields.title,
        description: data.items[0].fields.subtitle,
        images: [imageHref],
      },
    }
  }
}

export async function generateStaticParams() {
  return [
    {
      slug: 'tarifaço-de-trump-impacta-preço-do-nintendo-switch-2-e-outros-consoles',
    },
  ]
}

async function onGetPostBySlug(slug: string) {
  const response = await fetch(
    `${API_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries?content_type=blogPost&fields.slug=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      cache: 'no-cache',
    },
  )

  const data = await response.json()

  return data
}


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const data = await onGetPostBySlug(slug)

  
  if (!data) notFound()

  return <BlogPostPageClient data={data} />
}