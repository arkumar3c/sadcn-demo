import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearAuthSession, getAuthSession } from "@/lib/auth-storage"
import {
  BellIcon,
  ChevronDownIcon,
  CircleUserRoundIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

function initialsFromEmail(email: string) {
  const local = email.split("@")[0] ?? "?"
  if (local.length >= 2) return local.slice(0, 2).toUpperCase()
  return (local + "?").slice(0, 2).toUpperCase()
}

export function HeaderUserMenu() {
  const navigate = useNavigate()
  const session = getAuthSession()
  const email = session?.email ?? "user@example.com"
  const displayName = email.split("@")[0] ?? "User"

  function handleLogout() {
    clearAuthSession()
    navigate("/login", { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 rounded-lg px-2"
          aria-label="User menu"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="rounded-lg text-xs">
              {initialsFromEmail(email)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[140px] truncate text-sm font-medium md:inline">
            {displayName}
          </span>
          <ChevronDownIcon className="text-muted-foreground size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" align="end" sideOffset={8}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="rounded-lg text-xs">
                {initialsFromEmail(email)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{displayName}</span>
              <span className="text-muted-foreground truncate text-xs">
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleUserRoundIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
