import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-muted-foreground mb-8">
        Sorry, the blog post {"you're "} looking for {"doesn't"} exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Back to Blog</Link>
      </Button>
    </div>
  )
}
