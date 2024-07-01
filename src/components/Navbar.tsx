"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Connector } from "./Connector";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const path = usePathname();
  return (
    <div className="flex flex-row mx-auto w-full md:w-2/3 justify-between items-center pt-2 md:pt-4 px-4">
      <Link
        href={"/"}
        className="flex flex-row justify-center md:justify-start font-semibold tracking-tighter text-lg"
      >
        BetBlink
      </Link>
      <div className="flex flex-row items-center md:justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            {
              theme == "light" ? setTheme("dark") : setTheme("light");
            }
          }}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Connector />
      </div>
    </div>
  );
}
