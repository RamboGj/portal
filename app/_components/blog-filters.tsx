"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BlogFilters() {
  const [openMobileFilters, setOpenMobileFilters] = useState(false)

  return (
    <div className="space-y-6">
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full flex justify-between"
          onClick={() => setOpenMobileFilters(!openMobileFilters)}
        >
          Filters
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openMobileFilters ? "rotate-180" : ""}`} />
        </Button>

        {openMobileFilters && (
          <div className="mt-4 border rounded-md p-4 space-y-6">
            <MobileFilters />
          </div>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <DesktopFilters />
        </div>
      </div>
    </div>
  )
}

function MobileFilters() {
  return (
    <>
      <div className="space-y-4">
        <h4 className="font-medium">Search</h4>
        <div className="relative">
          <Input placeholder="Search articles..." className="w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Categories</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Select Categories
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem key={category} checked={false}>
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Date</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Select Date Range
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {dateRanges.map((range) => (
              <DropdownMenuCheckboxItem key={range} checked={false}>
                {range}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </>
  )
}

function DesktopFilters() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Search</h4>
        <div className="relative">
          <Input placeholder="Search articles..." className="w-full" />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date">
          <AccordionTrigger className="py-2">Date</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {dateRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={`date-${range}`} />
                  <Label htmlFor={`date-${range}`} className="text-sm font-normal cursor-pointer">
                    {range}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="authors">
          <AccordionTrigger className="py-2">Authors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {authors.map((author) => (
                <div key={author} className="flex items-center space-x-2">
                  <Checkbox id={`author-${author}`} />
                  <Label htmlFor={`author-${author}`} className="text-sm font-normal cursor-pointer">
                    {author}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

// Sample data
const categories = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Design",
  "Web Dev",
  "Performance",
  "Accessibility",
  "Node.js",
]

const dateRanges = ["Last 7 days", "Last 30 days", "Last 3 months", "Last year", "All time"]

const authors = ["Sarah Johnson", "Michael Chen", "Priya Patel", "David Rodriguez", "Emma Wilson"]
