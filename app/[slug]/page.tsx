import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TableOfContents } from "./_components/table-of-contents"
import { ShareButtons } from "./_components/share-buttons"
import { AuthorBio } from "./_components/author-biography"
import { RelatedPosts } from "./_components/related-posts"
import { Comments } from "./_components/comments"
import { ScrollProgressBar } from "./_components/scroll-progress-bar"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // In a real application, you would fetch the post data based on the slug
  const { slug } = await params

  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (

<>
<ScrollProgressBar />

    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Link href={`/blog/category/${category.toLowerCase()}`} key={category}>
                <Badge variant="secondary">{category}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link href={`/blog/author/${post.author.username}`} className="hover:text-foreground transition-colors">
                {post.author.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.dateISO}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents headings={post.headings} />
              <div className="mt-8">
                <ShareButtons url={`https://yourblog.com/blog/${post.slug}`} title={post.title} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Table of Contents (Mobile) */}
            <div className="lg:hidden mb-6">
              <TableOfContents headings={post.headings} />
            </div>

            {/* Article Content */}
            <article className="prose prose-slate max-w-none dark:prose-invert">
              <p className="lead">{post.excerpt}</p>

              <h2 id="introduction">Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
                erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique
                posuere.
              </p>

              <p>
                Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis
                ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus
                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>

              <h2 id="main-section">Main Section</h2>
              <p>
                Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              </p>

              <h3 id="sub-section-1">Sub-section 1</h3>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia
                bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac
                cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>

              <ul>
                <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>

              <h3 id="sub-section-2">Sub-section 2</h3>
              <p>
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget
                urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla
                non metus auctor fringilla.
              </p>

              <blockquote>
                <p>
                  This is a blockquote. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere
                  consectetur est at lobortis.
                </p>
              </blockquote>

              <h2 id="advanced-techniques">Advanced Techniques</h2>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Aenean
                lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id
                dolor id nibh ultricies vehicula ut id elit.
              </p>

              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                lacinia bibendum nulla sed consectetur.
              </p>

              <h2 id="conclusion">Conclusion</h2>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.
              </p>
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-8">
              {post.tags.map((tag) => (
                <Link href={`/blog/tag/${tag.toLowerCase()}`} key={tag}>
                  <Badge variant="outline">#{tag}</Badge>
                </Link>
              ))}
            </div>

            {/* Share Buttons (Mobile) */}
            <div className="lg:hidden mb-8">
              <ShareButtons url={`https://yourblog.com/blog/${post.slug}`} title={post.title} />
            </div>

            {/* Author Bio */}
            <AuthorBio author={post.author} />

            {/* Post Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {post.prevPost && (
                <Link
                  href={`/blog/${post.prevPost.slug}`}
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
                  href={`/blog/${post.nextPost.slug}`}
                  className="group flex items-center justify-end gap-2 p-4 border rounded-lg hover:bg-muted transition-colors ml-auto"
                >
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Next</div>
                    <div className="font-medium group-hover:text-primary transition-colors">{post.nextPost.title}</div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <Separator className="my-8" />

            {/* Related Posts */}
            <RelatedPosts posts={post.relatedPosts} />

            <Separator className="my-8" />

            {/* Comments */}
            <Comments postId={post.id} />
          </div>
        </div>
      </div>
    </div>
</>
  )
}

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: AI-Powered Interfaces",
    slug: "future-of-web-development-ai",
    excerpt:
      "Explore how artificial intelligence is revolutionizing the way we build and interact with web applications, from automated coding to intelligent user experiences.",
    date: "April 10, 2024",
    dateISO: "2024-04-10",
    image: "/placeholder.svg?height=600&width=1200&text=AI+Web+Development",
    categories: ["AI", "Web Dev"],
    tags: ["artificial-intelligence", "web-development", "future-tech", "ui-design"],
    readingTime: 8,
    author: {
      name: "Sarah Johnson",
      username: "sarahjohnson",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      bio: "Sarah is a senior developer with over 10 years of experience in web development and AI integration. She specializes in creating intelligent user interfaces and exploring the intersection of AI and web technologies.",
      twitter: "@sarahjohnsondev",
    },
    headings: [
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "main-section", text: "Main Section", level: 2 },
      { id: "sub-section-1", text: "Sub-section 1", level: 3 },
      { id: "sub-section-2", text: "Sub-section 2", level: 3 },
      { id: "advanced-techniques", text: "Advanced Techniques", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 },
    ],
    prevPost: {
      title: "Design Systems That Scale",
      slug: "design-systems-that-scale",
    },
    nextPost: {
      title: "Mastering Next.js 14: Server Components",
      slug: "mastering-nextjs-14-server-components",
    },
    relatedPosts: [
      {
        id: 2,
        title: "Mastering Next.js 14: Server Components",
        slug: "mastering-nextjs-14-server-components",
        excerpt: "A deep dive into Server Components and how they improve performance.",
        image: "/placeholder.svg?height=400&width=600&text=Next.js+14",
        date: "April 5, 2024",
      },
      {
        id: 3,
        title: "Design Systems That Scale",
        slug: "design-systems-that-scale",
        excerpt: "Building and maintaining design systems for growing organizations.",
        image: "/placeholder.svg?height=400&width=600&text=Design+Systems",
        date: "March 28, 2024",
      },
      {
        id: 4,
        title: "TypeScript Advanced Patterns",
        slug: "typescript-advanced-patterns",
        excerpt: "Level up your TypeScript skills with these advanced patterns and techniques.",
        image: "/placeholder.svg?height=400&width=600&text=TypeScript",
        date: "March 22, 2024",
      },
    ],
  },
]
