import { HeaderUserMenu } from "@/components/header-user-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"

const routeTitles: Record<string, string> = {
  "/": "Documents",
  "/products": "Products",
}

export function SiteHeader({ title: titleProp }: { title?: string }) {
  const { pathname } = useLocation()
  const title = titleProp ?? routeTitles[pathname] ?? ""

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-2 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          
        </div>
        <HeaderUserMenu />
      </div>
    </header>
  )
}
