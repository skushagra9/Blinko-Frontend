"use client"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function ImageContainer() {
  const { theme } = useTheme()
  return (
    <div className="px-4">
      <Image
        src={theme === "dark" ? "/light.png" : "/dark.png"}
        width={800}
        height={500}
        alt="Chat App"
        className="rounded-xl mt-16 border-2 border-indigo-400 gap-x-4"
      />
    </div>
  )
}
