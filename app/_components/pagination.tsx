import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button variant="outline" size="icon" disabled>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      <Button variant="outline" size="sm" className="h-8 w-8" aria-current="page">
        1
      </Button>

      <Button variant="outline" size="sm" className="h-8 w-8">
        2
      </Button>

      <Button variant="outline" size="sm" className="h-8 w-8">
        3
      </Button>

      <Button variant="outline" size="sm" className="h-8 w-8">
        4
      </Button>

      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
