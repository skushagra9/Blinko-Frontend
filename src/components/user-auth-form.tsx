"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";
import { useToast } from './ui/use-toast';
import { usePathname } from 'next/navigation'

export default function UserAuthForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast()
  const pathname = usePathname()

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    // const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const result = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await result.json();
      if (!data.error) {
        toast({
          title: data.success,
          description: data.message,
          variant: "error"
        })

        formRef.current?.reset();
      }
    } catch (error) {
      toast({
        title: "Error Sending the Form",
        description: "Please Try Again",
        variant: "error"
      })

      console.error(error)
    }
  };


  return (
    <div>
      <Button
        className="w-full"
        variant="default"
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground p-4">
            Or
          </span>
        </div>
      </div>
      {/*   <Card> */}
      {/*     <form */}
      {/*       ref={formRef} */}
      {/*       onSubmit={handleSubmit} */}
      {/*     > */}
      {/*       <CardHeader> */}
      {/*         <CardTitle className="icon_underline text-xl text-center">Continue With Email</CardTitle> */}
      {/*       </CardHeader> */}
      {/*       <CardContent> */}
      {/*         {pathname === "/register" && <div> */}
      {/*           <div className="grid w-full max-w-sm items-center gap-1.5 mt-2"> */}
      {/*             <Label htmlFor="email">Name</Label> */}
      {/*             <Input */}
      {/*               type="text" */}
      {/*               name="name" */}
      {/*               required */}
      {/*               placeholder="Enter your name" */}
      {/*             /> */}
      {/*           </div> */}
      {/*   <div className="grid w-full max-w-sm items-center gap-1.5 mt-2"> */}
      {/*     <Label htmlFor="email">Username</Label> */}
      {/*     <Input */}
      {/*       type="text" */}
      {/*       name="username" */}
      {/*       required */}
      {/*       placeholder="Enter your username" */}
      {/*     /> */}
      {/*   </div> */}
      {/*         </div> */}

      {/*         } */}
      {/*         <div className="grid w-full max-w-sm items-center gap-1.5 mt-2"> */}
      {/*           <Label htmlFor="name">Email</Label> */}
      {/*           <Input */}
      {/*             type="email" */}
      {/*             name="email" */}
      {/*             required */}
      {/*             placeholder="Enter your email" */}
      {/*           /> */}
      {/*         </div> */}
      {/*         <div className="grid w-full max-w-sm items-center gap-1.5 mt-2"> */}
      {/*           <Label htmlFor="email">Password</Label> */}
      {/*           <Input */}
      {/*             type="password" */}
      {/*             name="password" */}
      {/*             required */}
      {/*             placeholder="Enter your password" */}
      {/*           /> */}
      {/*         </div> */}
      {/*       </CardContent> */}
      {/*       <CardFooter> */}
      {/*         <Button type="submit" className="w-full"> */}
      {/*           Submit */}
      {/*         </Button> */}
      {/*       </CardFooter> */}
      {/*     </form> */}
      {/*   </Card> */}
    </div>
  );
}
