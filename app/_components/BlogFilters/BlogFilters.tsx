/* eslint-disable @typescript-eslint/no-explicit-any */
import { Circle } from "lucide-react";
import { Suspense } from "react";
import { BlogFiltersClient } from "./client";
import { API_BASE_URL } from "@/app/utils/api";
import { env } from "@/app/env";
import { REVALIDATE_TIME } from "@/app/utils/cache";

async function getFilters() {
    const response = await fetch(`${API_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries?content_type=filters`, {
        next: {
          revalidate: REVALIDATE_TIME
        },
        headers: {
          Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      })
      const data = await response.json()

      return data
}


export default async function BlogFilters() {
    const filters = await getFilters()

    const tags = filters.includes.Entry.filter((entry: any) => entry.sys.contentType.sys.id === 'tag')
    const authors = filters.includes.Entry.filter((entry: any) => entry.sys.contentType.sys.id === 'author')

    const formattedFilters = {
        authors,
        tags
    }

    return (
        <Suspense fallback={<Circle className="animate-spin scale-[500%] text-red-500" />}>
            <BlogFiltersClient filters={formattedFilters} />
        </Suspense>
    )
}