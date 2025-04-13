import Link from "next/link"
import Image from "next/image"
import { Clock, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FeaturedPosts() {
  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Featured Posts</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Post */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-xl">
          <Link href={`/blog/${featuredPosts[0].slug}`} className="absolute inset-0 z-10">
            <span className="sr-only">View article: {featuredPosts[0].title}</span>
          </Link>
          <div className="relative h-[400px] w-full">
            <Image
              src={featuredPosts[0].image || "/placeholder.svg"}
              alt={featuredPosts[0].title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary hover:bg-primary/90 text-white">{featuredPosts[0].categories[0]}</Badge>
              <Badge variant="outline" className="text-white border-white/40">
                {"Editor's "}Pick
              </Badge>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-2">
              {featuredPosts[0].title}
            </h3>
            <p className="text-white/80 mb-4 max-w-2xl line-clamp-2">{featuredPosts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage
                    src={featuredPosts[0].author.avatar || "/placeholder.svg"}
                    alt={featuredPosts[0].author.name}
                  />
                  <AvatarFallback>{featuredPosts[0].author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/90">{featuredPosts[0].author.name}</span>
              </div>
              <div className="flex items-center gap-1 text-white/70 text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>{featuredPosts[0].readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Featured Posts */}
        <div className="grid grid-cols-1 gap-6">
          {featuredPosts.slice(1, 3).map((post) => (
            <div key={post.id} className="relative group overflow-hidden rounded-xl">
              <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View article: {post.title}</span>
              </Link>
              <div className="relative h-[180px] w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary hover:bg-primary/90 text-white">{post.categories[0]}</Badge>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:underline decoration-2 underline-offset-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{post.date}</span>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Featured Posts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {featuredPosts.slice(3, 6).map((post) => (
          <div key={post.id} className="group">
            <div className="relative h-[200px] w-full overflow-hidden rounded-xl mb-3">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <Badge className="absolute top-3 left-3 bg-primary hover:bg-primary/90 text-white">
                {post.categories[0]}
              </Badge>
            </div>
            <Link href={`/blog/${post.slug}`} className="group-hover:underline decoration-2 underline-offset-2">
              <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
            </Link>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="hover:cursor-pointer gap-2">
          View All Featured Posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </div>
    </section>
  )
}

// Enhanced featured posts data with author information and reading time
const featuredPosts = [
  {
    id: 1,
    title: "The Future of Web Development: AI-Powered Interfaces",
    slug: "future-of-web-development-ai",
    excerpt:
      "Explore how artificial intelligence is revolutionizing the way we build and interact with web applications.",
    date: "April 10, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["AI", "Web Dev"],
    readingTime: 8,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    },
  },
  {
    id: 2,
    title: "Mastering Next.js 14: Server Components",
    slug: "mastering-nextjs-14-server-components",
    excerpt: "A deep dive into Server Components and how they improve performance.",
    date: "April 5, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["Next.js", "React"],
    readingTime: 6,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
  },
  {
    id: 3,
    title: "Design Systems That Scale",
    slug: "design-systems-that-scale",
    excerpt: "Building and maintaining design systems for growing organizations.",
    date: "March 28, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["Design", "UI/UX"],
    readingTime: 5,
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=100&width=100&text=PP",
    },
  },
  {
    id: 4,
    title: "TypeScript Advanced Patterns",
    slug: "typescript-advanced-patterns",
    excerpt: "Level up your TypeScript skills with these advanced patterns and techniques.",
    date: "March 22, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["TypeScript", "JavaScript"],
    readingTime: 7,
    author: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=DR",
    },
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Best practices for creating inclusive web experiences for all users.",
    date: "March 18, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["Accessibility", "Web Dev"],
    readingTime: 6,
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=100&width=100&text=EW",
    },
  },
  {
    id: 6,
    title: "Performance Optimization Techniques",
    slug: "performance-optimization-techniques",
    excerpt: "Strategies to make your web applications lightning fast.",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categories: ["Performance", "Web Dev"],
    readingTime: 9,
    author: {
      name: "James Taylor",
      avatar: "/placeholder.svg?height=100&width=100&text=JT",
    },
  },
]
