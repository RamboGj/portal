"use client"

import { Linkedin, Link, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ShareButtonsProps {
  url: string
  title: string
}
export function ShareButtons({ url, title }: ShareButtonsProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast("Link copied", { 
        description: "The article link has been copied to your clipboard."
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">Share this article</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-800 transition duration-500 hover:cursor-pointer hover:scale-110"
          size="icon"
          onClick={() =>
            window.open(
              `https://x.com/intent/x?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
              "_blank",
            )
          }
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-white" />
        </Button>
        <Button
         className="bg-blue-600 hover:bg-blue-800 transition duration-500 hover:cursor-pointer hover:scale-110"
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
              "_blank",
            )
          }
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 text-white" />
        </Button>
        <Button 
         className="bg-blue-600 hover:bg-blue-800 transition duration-500 hover:cursor-pointer hover:scale-110"
          variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy link">
          <Link className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  )
}
