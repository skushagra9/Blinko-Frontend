"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Myavatar } from "./Avatar";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

interface DropdownMenuDemouserProps {
  email: string | null;
  name: string | null;
  children: ReactNode;
}

export const DropdownMenuDemouser: React.FC<DropdownMenuDemouserProps> = ({
  children,
  email,
  name,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative ml-3 h-8 w-8 rounded-full"
          >
            {children}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Button className="w-full" variant="ghost" onClick={() => signOut()}>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
