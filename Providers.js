import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { toast } from "@shadcn/ui"; // Uncomment and import toast for notifications

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
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Get the chainId
        const network = await web3Provider.getNetwork();
        setChainId(network.chainId.toString());

        // Get the balance of the connected account
        const balance = await web3Provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));

        // Show toast for wallet connected
    //     toast({
    //       title: "Wallet Connected",
    //       description: `Connected to account: ${accounts[0]}`,
    //     });
    //   } else {
    //     toast({
    //       title: "Wallet Not Detected",
    //       description: "Please install MetaMask or another Ethereum wallet.",
    //       variant: "error",
    //     });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    //   toast({
    //     title: "Connection Error",
    //     description: "There was an issue connecting to the wallet. Please try again.",
    //     variant: "error",
    //   });
    }
  };

  // Listen for account and network changes
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || null);
    //   toast({
    //     title: "Account Changed",
    //     description: `Switched to account: ${accounts[0]}`,
    //   });
    };

    const handleChainChanged = (chainId) => {
      setChainId(chainId);
    //   toast({
    //     title: "Network Changed",
    //     description: `Switched to network: ${chainId}`,
    //   });
      window.location.reload(); // Reload the page on network change
    };

    const handleDisconnect = () => {
      setAccount(null);
      setBalance(null);
    //   toast({
    //     title: "Wallet Disconnected",
    //     description: "Your wallet has been disconnected.",
    //     variant: "warning",
    //   });
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("disconnect", handleDisconnect);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, []);

  return {
    provider,
    account,
    balance,
    chainId,
    connectWallet,
  };
};

export default useEIP1193Provider;
