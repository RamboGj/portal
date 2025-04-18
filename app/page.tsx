/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "./_components/pagination"
import { API_BASE_URL } from "./utils/api"
import { env } from "./env"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Tag } from "lucide-react"

import { format } from "date-fns"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BlogFilters from "./_components/BlogFilters/BlogFilters"

export interface AssetProps {
  fields: {
    title: string
    description: string
    file: {
      contentType: 'string'
      details: {
        image: { width: number, height: number } 
        size: number
      }
      fileName: string
      url: string
    }
  }
  metadata: {
    tags: string[]
    concepts: string[]
  }
  sys: {
    createdAt: Date
    updatedAt: Date
    environment: {
      sys: {
        id: string, 
        type: string, 
        linkType: string
      }
    }
    id: string
    locale: string
    type: string | 'Asset'
    publishedVersion: number
    revision: number
    space: {
      sys: {
        id: string, 
        type: string, 
        linkType: string
      }
    }
  }
}

export interface EntryProps {
  fields: any
  metadata: {
    tags: string[]
    concepts: string[]
  }
  sys: {
    id: string
    type: string | 'Entry'
    createdAt: Date
    updatedAt: Date
    locale: string
    publishedVersion: number
    revision: number
    environment: {
      sys: {
        id: string
        linkType: string | 'Environment'
        type: string | 'Link'
      }
    }
    contentType: {
      sys: {
        id: string
        linkType: string | 'ContentType'
        type: string | 'Link'
      }
    }
    space: {
      sys: {
        id: string
        linkType: string | 'Space'
        type: string | 'Link'
      }
    }
  }  
}

export interface PostFields {
    slug: string, 
    rating: number, 
    readTime: number,
    author: {
      sys: {
        type: string | 'Link', 
        linkType: 'Entry',
        id: string
      }
    }
    publishedDate: Date, 
    title: string, 
    subtitle: string, 
    featuredImage: {
      sys: {
        id: string
        linkType: string /* Asset */
        type: string /* Link */
      }
    } 
    content: {
      data: unknown
      marks: unknown[]
      nodeType: string | 'text'
      value: string
    }
    tags: {
      sys: {
        id:string
        linkType: 'Entry'
        type: string | 'Link'
      }
    }
}

interface BlogPostsReturnProps {
  includes: { Asset: AssetProps[] | null, Entry: EntryProps[] | null }
  skip: number
  limit: number
  items: {
    fields: PostFields
    metadata: {
      tags: string[]
      concepts: string[]
    }
  }[]
}

async function fetchBlogPosts() {
  const response = await fetch(`${API_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries?content_type=blogPost`, {
    // next: {
    //   revalidate: REVALIDATE_TIME
    // },
    headers: {
      Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  })
  const data: BlogPostsReturnProps = await response.json()

  return data 
}

export default async function BlogPage() {
  const { items, includes } = await fetchBlogPosts()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">

      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h1>
          <p className="text-muted-foreground">Discover the latest insights, tutorials, and updates from our team.</p>
        </div>

        {/* Featured Posts Section */}
        {/* <FeaturedPosts />
        <Separator /> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BlogFilters />
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Posts</h2>
              <p className="text-sm text-muted-foreground">Showing 1-6 of 24 posts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map(({ fields }) => {
                const author = includes?.Entry?.find((asset) => {
                  return asset.sys.id === fields.author.sys.id
                })

                const image = includes?.Asset?.find((asset) => {
                  return asset.sys.id === fields.featuredImage.sys.id
                }) 

                const authorImage = includes?.Asset?.find((asset) => {
                  return asset.sys.id === author?.fields.avatar.sys.id
                })?.fields.file.url

                const tags = includes?.Entry?.filter((entry) => entry.sys.contentType.sys.id === 'tag')

                return (
                  <Link key={fields.slug} href={`/${fields.slug}`}>
                    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={`https:${image?.fields.file.url}` || ""}
                        alt={image?.fields.title || ""}
                        fill
                        className="object-cover transition-transform hover:scale-120 duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        {tags?.map((tag) => {
                          return (
                            <Badge key={tag.fields.value} variant="secondary" className="rounded-full">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag.fields.value}
                            </Badge>
                          )
                        })}
                       
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {fields.readTime} min read
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold leading-tight tracking-tight">{fields.title}</h3>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-grow">
                      <p className="text-muted-foreground text-sm line-clamp-3">{fields.subtitle}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage className=" rounded-full" src={`https:${authorImage}`} alt={author?.fields.name} />
                          <AvatarFallback>{author?.fields.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{"Thiago Aladio Marques"}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {format(fields.publishedDate, "MMM dd")}
                          </div>
                        </div>
                      </div>
                      
                    </CardFooter>
                  </Card>
                </Link>
                )
              } )}
            </div>

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}