import {
  ChevronsUpDown,
  LogOut,
  User,
} from "lucide-react"

import { useClerk } from "@clerk/clerk-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar()
  const { signOut, openUserProfile } = useClerk()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-gray-800 data-[state=open]:text-white hover:bg-gray-800/50 md:h-8 md:p-0">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-[#D4FF00]/20 text-[#D4FF00]">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">{user.name}</span>
                <span className="truncate text-xs text-gray-400">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray-900 border-gray-800"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-[#D4FF00]/20 text-[#D4FF00]">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">{user.name}</span>
                  <span className="truncate text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => openUserProfile()}
                className="text-gray-300 hover:bg-gray-800 hover:text-[#D4FF00] focus:bg-gray-800 focus:text-[#D4FF00] cursor-pointer"
              >
                <User />
                Manage Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="text-gray-300 hover:bg-gray-800 hover:text-red-500 focus:bg-gray-800 focus:text-red-500 cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
