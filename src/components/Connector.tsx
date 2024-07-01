"use client";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/app/providers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function Connector() {
  const CHAIN_ID = 1328
  const { address } = useWeb3();
  const [connected, setConnected] = useState(false);
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

  const getUser = async () => {
    console.log(address)
    const query = `
    query {
      getUser(address: "${address}") {
        id
        address
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
      console.log(data)

      if (data.data && data.data.getUser) {
        console.log('User found:', data.data.getUser);
        setConnected(true)
        return data.data.getUser;
      } else {
        console.log('User not found in the database');
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch user from database:', error);
      return null;
    }
  };

  const updateUser = async () => {
    const query = `
    mutation {
      connectWallet(address: "${address}")
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
        setConnected(true)
      } else {
        console.log('Failed to sync user in the database');
      }
    } catch (error) {
      console.error('Failed to update user in database:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await Checkout();
      if (address) {
        await getUser();
      }
    };
    init();
  }, [address]);
  return (
    <Button
      onClick={async () => {
        await updateUser();
      }}
      variant="ghost"
      disabled={connected}
    >
      {connected ? "Connected" : "Connect"}
    </Button>
  );
}
