import Link from "next/link"
import { Twitter, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface AuthorProps {
  name: string
  username: string
  avatar: string
  bio: string
  twitter?: string
  website?: string
}

interface AuthorBioProps {
  author: AuthorProps
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-6 my-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Avatar className="h-16 w-16 border-2 border-background">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-semibold">{author.name}</h3>
            <Link href={`/author/${author.username}`} className="text-sm text-muted-foreground hover:text-primary">
              View all posts
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">{author.bio}</p>
          <div className="flex gap-2">
            {author.twitter && (
              <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                <a
                  href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 mr-1" />
                  {author.twitter}
                </a>
              </Button>
            )}
            {author.website && (
              <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                <a href={author.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-1" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
