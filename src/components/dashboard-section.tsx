"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { CalendarIcon, DownloadIcon, PlusIcon } from "lucide-react"

/**
 * Page shell aligned with the Shadcraft / official shadcn dashboard frame:
 * breadcrumb, page title, toolbar, then metric cards + chart + table as children.
 * @see https://shadcraft.com/blocks/official-shadcn/dashboard
 */
export function DashboardSection({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6",
        className
      )}
    >
      <div className="flex flex-col justify-between gap-4 px-4 sm:flex-row sm:items-start lg:px-6">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your documents and track performance.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <CalendarIcon className="size-4" aria-hidden />
            Date range
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <DownloadIcon className="size-4" aria-hidden />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <PlusIcon className="size-4" aria-hidden />
            Quick create
          </Button>
        </div>
      </div>

      {children ? (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
          {children}
        </div>
      ) : null}
    </div>
  )
}
