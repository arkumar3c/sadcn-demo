import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  BarChart3Icon,
  CreditCardIcon,
  HomeIcon,
  LogOutIcon,
  PackageIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"
import { NavLink, useMatch } from "react-router-dom"

const platform: {
  title: string
  to: string
  end?: boolean
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { title: "Overview", to: "/", end: true, icon: HomeIcon },
  { title: "Analytics", to: "#", icon: BarChart3Icon },
  { title: "Products", to: "/products", icon: PackageIcon },
  { title: "Customers", to: "#", icon: UsersIcon },
]

const account = [
  { title: "Billing", href: "#", icon: CreditCardIcon },
  { title: "Settings", href: "#", icon: SettingsIcon },
]

export function DashboardSidebar() {
  return (
    <Sidebar side="left" variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SparklesIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Studio</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Enterprise
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platform.map((item) =>
                item.to.startsWith("#") ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <RouteSidebarLink key={item.title} {...item} />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <LogOutIcon />
                <span>Sign out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function RouteSidebarLink({
  title,
  to,
  end,
  icon: Icon,
}: {
  title: string
  to: string
  end?: boolean
  icon: React.ComponentType<{ className?: string }>
}) {
  const match = useMatch({ path: to, end: end ?? false })

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match} tooltip={title}>
        <NavLink to={to} end={end}>
          <Icon />
          <span>{title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
