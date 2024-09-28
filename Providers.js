import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useEIP1193Provider = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);

  // Function to handle connecting the wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccount(account);

        // Get the chainId
        const network = await web3Provider.getNetwork();
        setChainId(network.chainId.toString());

        // Get the balance of the connected account
        const balance = await web3Provider.getBalance(account);
        setBalance(ethers.formatEther(balance));
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to get balance for an arbitrary address
  const getBalance = async (address) => {
    if (provider) {
      try {
        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
      }
    }
    console.error("Provider is not initialized");
    return null;
  };

  return {
    provider,
    account,
    balance,
    chainId,
    connectWallet,
    getBalance, // Return the getBalance function here
  };
};

export default useEIP1193Provider;
