"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Home, UserIcon, UserX } from "lucide-react";
import Link from "next/link";
import { User } from "@/app/lib";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";

export function UserDropdown({ user }: { user: User }) {
  const pages = [
    { id: 1, name: "Inicial", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      id: 2,
      name: "Perfil",
      href: "/profile",
      icon: <UserIcon className="w-4 h-4" />,
    },
  ];

  const handleButtonPress = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {pages.map((page) => (
          <DropdownMenuItem key={page.id}>
            <Link href={page.href} className="flex items-center gap-2">
              {page.icon} {page.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2 p-0"
            onClick={handleButtonPress}
          >
            <UserX className="w-4 h-4" /> Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
