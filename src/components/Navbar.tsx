"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useWeb3 } from "@/app/providers";
import { ethers } from "ethers";
import { useEffect } from "react";

export function Navbar() {
  const CHAIN_ID = 1328
  const { setTheme, theme } = useTheme();
  const path = usePathname();
  const { address } = useWeb3();

  const Checkout = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      provider.send("eth_requestAccounts", []);
      const { chainId } = await provider.getNetwork();
      if (chainId !== CHAIN_ID) {
        alert("Please switch to the SEI Atlantic Testnet Network");
        try {
          console.log("Switched to the SEI Atlantic Testnet Network");
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + CHAIN_ID.toString(16) }],
          });
          window.location.reload();
        } catch (error) {
          const switchError = error as any;
          if (switchError.code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: '0x' + CHAIN_ID.toString(16),
                  rpcUrls: ["https://sei-testnet-2-rpc.brocha.in"],
                  chainName: "SEI Atlantic Testnet",
                  nativeCurrency: {
                    name: "SEI",
                    symbol: "SEI",
                    decimals: 18
                  },
                }]
              });
              window.location.reload();
            } catch (addError) {
              console.error('Failed to add network:', addError);
            }
          }
        }
      }
    } else {
      alert("Please install MetaMask!");
    }
  }


  const updateUser = async () => {
    const query = `
    mutation {
      connectWallet(address: "${address}") {
        message
      }
    }
  `;
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log(data, "response");

      if (data.data.connectWallet) {
        console.log(data.data.connectWallet);
      } else {
        console.log('Failed to sync user in the database');
      }
    } catch (error) {
      console.error('Failed to update user in database:', error);
    }
  };

  // if (path === "/login" || path === "/register") {
  //   return null;
  // }


  return (
    <div className="flex flex-row mx-auto w-full md:w-2/3 justify-between items-center pt-2 md:pt-4 px-4">
      <Link
        href={"/"}
        className="flex flex-row justify-center md:justify-start font-semibold tracking-tighter text-lg"
      >
        Turbo-Starter-Template
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
        <Button
          onClick={async () => {
            await Checkout();
            await updateUser();
          }}
          variant="ghost"
        >
          Connect
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}
