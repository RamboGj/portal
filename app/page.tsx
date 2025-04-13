import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BlogFilters } from "./_components/blog-filters"
import { Pagination } from "./_components/pagination"

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h1>
          <p className="text-muted-foreground">Discover the latest insights, tutorials, and updates from our team.</p>
        </div>

        {/* Featured Posts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {post.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto">
                      Read more
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BlogFilters />
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">All Posts</h2>
              <p className="text-sm text-muted-foreground">Showing 1-6 of 24 posts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <div className="relative h-48 w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="link" className="p-0 h-auto">
                        Read more
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the featuredPosts array with better placeholder images
const featuredPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    excerpt: "Learn how to build modern web applications with Next.js 14 and its powerful features.",
    date: "April 10, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["Next.js", "React"],
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    slug: "mastering-tailwind-css",
    excerpt: "Discover advanced techniques and best practices for building beautiful UIs with Tailwind CSS.",
    date: "April 5, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["CSS", "Design"],
  },
  {
    id: 3,
    title: "The Future of Web Development",
    slug: "future-of-web-development",
    excerpt: "Explore emerging trends and technologies shaping the future of web development.",
    date: "March 28, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["Web Dev", "Trends"],
  },
]

// Update the blogPosts array with better placeholder images
const blogPosts = [
  {
    id: 4,
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Learn how to create web applications that are accessible to everyone.",
    date: "March 22, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["Accessibility", "Web Dev"],
  },
  {
    id: 5,
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    excerpt: "Get started with TypeScript and learn how it can improve your JavaScript development.",
    date: "March 18, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["TypeScript", "JavaScript"],
  },
  {
    id: 6,
    title: "Optimizing React Performance",
    slug: "optimizing-react-performance",
    excerpt: "Techniques and strategies to improve the performance of your React applications.",
    date: "March 15, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["React", "Performance"],
  },
  {
    id: 7,
    title: "State Management in 2024",
    slug: "state-management-in-2024",
    excerpt: "An overview of modern state management solutions for frontend applications.",
    date: "March 10, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["React", "State Management"],
  },
  {
    id: 8,
    title: "Building a REST API with Node.js",
    slug: "building-rest-api-nodejs",
    excerpt: "A step-by-step guide to creating a RESTful API using Node.js and Express.",
    date: "March 5, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["Node.js", "API"],
  },
  {
    id: 9,
    title: "CSS Grid Layout Mastery",
    slug: "css-grid-layout-mastery",
    excerpt: "Master CSS Grid Layout to create complex and responsive web layouts with ease.",
    date: "February 28, 2024",
    image: "https://imgs.search.brave.com/m2KKpE9mVa6jzJe-IM4DZsUOMc5IyHY2kQHyhYBvCxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODg1MzEtTUxCNzY3/NTI4Nzg3NjdfMDUy/MDI0LU8ud2VicA",
    categories: ["CSS", "Layout"],
  },
]
