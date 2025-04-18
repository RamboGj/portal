/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SetStateAction, useState } from "react"
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
import { useRouter, useSearchParams } from "next/navigation"

interface BlogFiltersClientProps {
    filters: any
}

export function BlogFiltersClient({ filters }: BlogFiltersClientProps) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [authorsFilters, setAuthorsFilters] = useState<string[]>(() => {
    const urlAuthors = searchParams.get('authors')

    if (urlAuthors) {
        return urlAuthors?.split(',')
    }

    return []
  
  })
  const [categoriesFilters, setCategoriesFilters] = useState<string[]>([])
  const [openMobileFilters, setOpenMobileFilters] = useState(false)

  const FILTER_KEY_TO_FUNCTION_MAP = new Map<'authors' | 'categories', (value: SetStateAction<string[]>) => void>([
    ['authors', setAuthorsFilters],
    ['categories', setCategoriesFilters],
  ])

  function handleApplyFilters() {
    const params = new URLSearchParams();

    if (authorsFilters.length > 0) {
      params.set('authors', authorsFilters.join(','));
    }
  
    if (categoriesFilters.length > 0) {
      params.set('categories', categoriesFilters.join(','));
    }
  
    const queryString = params.toString();
  
    replace(`/${queryString ? `?${queryString}` : ''}`);
  }

  function handleSelectFilter(selected: boolean, selectedValue: string, key: 'authors' | 'categories') {
    const handler = FILTER_KEY_TO_FUNCTION_MAP.get(key)

    if (!handler) return

    handler((prev) => {
        if (selected) {
          return [...prev, selectedValue];
        } else {
          return prev.filter((val) => val !== selectedValue);
        }
      });
    
  }

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
            <MobileFilters filters={filters} />
          </div>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <DesktopFilters handleApplyFilters={handleApplyFilters} selectedAuthors={authorsFilters} selectedCategories={categoriesFilters} onSelect={handleSelectFilter} filters={filters}  />
        </div>
      </div>
    </div>
  )
}

function MobileFilters({ filters }: BlogFiltersClientProps) {
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
            {filters.tags.map((tag: any) => {
                const tagValue = tag.fields.value
                
                return (
              <DropdownMenuCheckboxItem key={`tag-${tagValue}`} checked={false}>
                {tagValue}
              </DropdownMenuCheckboxItem>
            )})}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <div className="space-y-4">
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
      </div> */}

      <Button className="w-full">Apply Filters</Button>
    </>
  )
}

function DesktopFilters({ filters, onSelect, selectedAuthors, selectedCategories, handleApplyFilters }: { handleApplyFilters: () => void, filters: any, onSelect: (selected: boolean, selectedValue: string, key: "authors" | "categories") => void, selectedAuthors: string[], selectedCategories: string[] }) {
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
              {filters.tags.map((tag: any, index: number) => {
                const tagValue = tag.fields.value

                return (
                    (
                        <div key={`tag-${index}`}  className="flex items-center space-x-2">
                          <Checkbox 
                          checked={selectedCategories.includes(tagValue)} 
                          onCheckedChange={(checked) => {
                            onSelect(Boolean(checked), tagValue, 'categories')
                          }} id={`category-${tagValue}`} />
                          <Label htmlFor={`category-${tagValue}`} className="text-sm font-normal cursor-pointer">
                            {tagValue}
                          </Label>
                        </div>
                      )
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="date">
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
        </AccordionItem> */}

        <AccordionItem value="authors">
          <AccordionTrigger className="py-2">Authors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {filters?.authors?.map((author: any) => {
                const authorName = author.fields.name

                return (
                    <div key={`category-${authorName}`} className="flex items-center space-x-2">
                      <Checkbox
                      defaultChecked={selectedAuthors.includes(authorName)}
                         onCheckedChange={(checked) => {
                            onSelect(Boolean(checked), authorName, 'authors')
                          }} 
                      id={`author-${authorName}`} />
                      <Label htmlFor={`author-${authorName}`} className="text-sm font-normal cursor-pointer">
                        {authorName}
                      </Label>
                    </div>
                  )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
    </div>
  )
}


// const dateRanges = ["Last 7 days", "Last 30 days", "Last 3 months", "Last year", "All time"]