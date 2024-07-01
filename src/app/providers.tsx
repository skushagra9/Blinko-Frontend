"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

type AddressType = string | null;

interface Web3ContextType {
  address: AddressType;
}

const Web3Context = createContext<Web3ContextType>({ address: null });

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<AddressType>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = web3Provider.getSigner();
      signer.getAddress().then((address) => {
        setAddress(address);
      }).catch(error => {
        console.error('Failed to get signer address:', error);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ address }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  return useContext(Web3Context);
};
