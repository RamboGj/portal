'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BlogPostProps } from "../page"
import { ScrollProgressBar } from "./scroll-progress-bar"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { ShareButtons } from "./share-buttons"
import { APP_URL } from "@/app/utils/urls"

export const getOptions = (includes: any) => {
    return {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
          return (
            <p className="font-regular mt-4 text-sm font-normal leading-[2.18rem] tracking-[-0.03rem] text-neutrals500 lg:text-base lg:leading-[2.18rem]">
              {children}
            </p>
          )
        },
        [BLOCKS.HEADING_3]: (node: any, children: any) => {
          return (
            <h3 className="mt-12 block text-base font-bold text-[#FAFAFA] lg:text-[1.25rem]">
              {children}
            </h3>
          )
        },
        [BLOCKS.OL_LIST]: (node: any, children: any) => {
          return <ol className="mt-4 flex list-decimal flex-col">{children}</ol>
        },
        [BLOCKS.UL_LIST]: (node: any, children: any) => {
          return <ul className="mt-4 flex list-disc flex-col">{children}</ul>
        },
        [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
          return (
            <li className="font-regular -mt-2 ml-6 text-sm text-[#949494] lg:text-base">
              {children}
            </li>
          )
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
          const targetId = node.data.target.sys.id
  
          const entry = includes.Entry.find(
            (entry: any) => entry.sys.id === targetId,
          )
  
          const asset = includes.Asset.find(
            (item: any) => item.sys.id === entry.fields.image.sys.id,
          )

          console.log("[TARGET ID]: ", targetId)
          console.log("[ENTRY]: ", entry)
          console.log("[asset]: ", asset)
  
          if (asset && asset.fields.file) {
            const { url, details } = asset.fields.file
            const { width, height } = details.image || { width: 620, height: 385 }
  
            console.log("URL ->", url)

            return (
              <Image
                src={`https:${url}`}
                width={width}
                height={height}
                alt={
                  asset.fields.description ||
                  asset.fields.title ||
                  'Embedded Asset'
                }
                className="mx-auto mb-[4.25rem] mt-[3.3rem] max-h-[385px] max-w-[320px] object-contain lg:max-h-[455px] lg:max-w-[720px]"
              />
            )
          }
  
          return null
        },

        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          const targetId = node.data.target.sys.id
  
          const asset = includes.Asset.find(
            (entry: any) => entry.sys.id === targetId,
          )

          if (asset && asset.fields.file) {
            const { url, details } = asset.fields.file
            const { width, height } = details.image || { width: 620, height: 385 }
  
            console.log("URL ->", url)

            return (
              <Image
                src={`https:${url}`}
                width={width}
                height={height}
                alt={
                  asset.fields.description ||
                  asset.fields.title ||
                  'Embedded Asset'
                }
                className="mx-auto mb-[4.25rem] mt-[3.3rem] max-h-[385px] max-w-[280px] md:max-w-[380px] object-contain lg:max-h-[455px] lg:max-w-[720px]"
              />
            )
          }
  
          return null
        },
  
        [INLINES.HYPERLINK]: ({ data }: any, children: any) => {
          return (
            <Link
              target="_blank"
              href={data.uri || ''}
              className="font-regular text-sm text-[#DAA520] transition duration-300 hover:opacity-85 lg:text-base"
            >
              {children}
            </Link>
          )
        },
      },
  
      renderMark: {
        [MARKS.BOLD]: (children: React.ReactNode) => (
          <strong className="text-sm font-medium text-[#FAFAFA] lg:text-base">
            {children}
          </strong>
        ),
        [MARKS.CODE]: (text: any) => {
          return (
            <pre className="break-words rounded-[8px] bg-neutrals1000 py-4 font-mono text-sm">
              <code className="whitespace-pre-wrap break-words">
                {text.split('\n').slice(1).join('\n')}
              </code>
            </pre>
          )
        },
      },
    }
  }

export function BlogPostPageClient({ data }: { data: BlogPostProps }) {
  console.log("data ->", data)

  const content = data.items[0].fields.content
    
    const post = data.items[0].fields

    const image = data.includes.Asset.find(
        (asset) => asset.sys.id === data.items[0].fields.featuredImage.sys.id,
      )
  
      console.log("content ->", content)

    const imageHref = `https:${image?.fields.file.url}`

  return (
<div className="overflow-x-hidden">
<ScrollProgressBar />

        <div className="relative  w-screen h-[240px] md:h-[500px]">
              <Image
                  src={imageHref}
                  alt={post.title}
                  fill
                  className="object-cover w-screen h-[240px] md:h-[500px]"
                  priority
                />
            </div>

    <div className="mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">


            {/* Post Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {/* {post.categories.map((category) => (
              <Link href={`/category/${category.toLowerCase()}`} key={category}>
                <Badge variant="secondary">{category}</Badge>
              </Link>
            ))} */}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link href={`/author/${post.author.username}`} className="hover:text-foreground transition-colors">
                {post.author.name}
              </Link> */}
            </div>
            {/* <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.dateISO}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div> */}
          </div>
        </header>

        

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              {/* <TableOfContents headings={post.headings} /> */}
              <div className="mt-8">
                <ShareButtons url={`${APP_URL}/${post.slug}`} title={post.title} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Table of Contents (Mobile) */}
            {/* <div className="lg:hidden mb-6">
              <TableOfContents headings={post.headings} />
            </div> */}

            {/* Article Content */}
            <article className="mb-[3.3rem] mt-[2.8rem] w-full">
              {documentToReactComponents(content as any, getOptions(data.includes))}
            </article>

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-2 my-8">
              {post.tags.map((tag) => (
                <Link href={`/${tag.toLowerCase()}`} key={tag}>
                  <Badge variant="outline">#{tag}</Badge>
                </Link>
              ))}
            </div> */}

            {/* Share Buttons (Mobile) */}
            <div className="lg:hidden mb-8">
              <ShareButtons url={`https://yourblog.com/${post.slug}`} title={post.title} />
            </div>

            {/* Author Bio */}
            {/* <AuthorBio author={post.author} /> */}

            {/* Post Navigation */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {post.prevPost && (
                <Link
                  href={`/${post.prevPost.slug}`}
                  className="group flex items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <div>
                    <div className="text-sm text-muted-foreground">Previous</div>
                    <div className="font-medium group-hover:text-primary transition-colors">{post.prevPost.title}</div>
                  </div>
                </Link>
              )}
              {post.nextPost && (
                <Link
                  href={`/${post.nextPost.slug}`}
                  className="group flex items-center justify-end gap-2 p-4 border rounded-lg hover:bg-muted transition-colors ml-auto"
                >
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Next</div>
                    <div className="font-medium group-hover:text-primary transition-colors">{post.nextPost.title}</div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div> */}

            <Separator className="my-8" />

            {/* Related Posts */}
            {/* <RelatedPosts posts={post.relatedPosts} /> */}

            {/* <Separator className="my-8" /> */}

            {/* Comments */}
            {/* <Comments postId={post.id} /> */}
          </div>
        </div>
      </div>
    </div>
</div>
  )
}
