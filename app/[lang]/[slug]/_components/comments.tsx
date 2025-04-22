"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface CommentsProps {
  postId: number
}

export function Comments({ postId }: CommentsProps) {
  console.log(postId)
  
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send the comment to your API

    // Reset form
    setComment("")
    setIsSubmitting(false)
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Comments ({sampleComments.length})</h2>

      {/* Comment form */}
      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!comment.trim() || isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Separator className="my-6" />

      {/* Comments list */}
      <div className="space-y-6">
        {sampleComments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex gap-4 mt-2">
                <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
              </div>

              {/* Nested replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{reply.author.name}</span>
                          <span className="text-xs text-muted-foreground">{reply.date}</span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                        <div className="flex gap-4 mt-2">
                          <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                          <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Sample comments data
const sampleComments = [
  {
    id: 1,
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=AC",
    },
    date: "2 days ago",
    content:
      "This is a fantastic article! I've been exploring AI in web development recently and found your insights very helpful. Looking forward to more content like this.",
    replies: [
      {
        id: 101,
        author: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        },
        date: "1 day ago",
        content: "Thanks Alex! I'm glad you found it helpful. I'll be covering more AI topics in upcoming articles.",
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Jamie Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=JR",
    },
    date: "3 days ago",
    content:
      "I'm curious about how these AI interfaces handle accessibility concerns. Have you done any research on that aspect?",
    replies: [],
  },
  {
    id: 3,
    author: {
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=TK",
    },
    date: "5 days ago",
    content:
      "Great overview of the current state of AI in web development. I'd love to see a follow-up article about practical implementation examples.",
    replies: [],
  },
]
