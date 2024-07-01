"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";


export function Myavatar() {

  const { data: session } = useSession();
  if (session) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? ""}
        />
        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
      </Avatar>

    )
  }
}
