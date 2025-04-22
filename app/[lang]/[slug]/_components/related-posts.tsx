import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface RelatedPost {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <Link href={`/${post.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/${post.slug}`} className="hover:underline">
                <h3 className="font-semibold mb-2">{post.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
