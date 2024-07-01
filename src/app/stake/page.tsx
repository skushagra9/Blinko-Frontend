"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Canvas } from '@/components/Canvas';
import { useWeb3 } from "@/app/providers";
export default function Stake() {
  const { address } = useWeb3();
  return (
    <div className="flex flex-row justify-center items-center w-full h-full mt-10">
      <div className="flex flex-col gap-y-4 p-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </div>
      <div className="flex justify-center items-center p-4">
        <Canvas />
      </div>
    </div>
  )
}

