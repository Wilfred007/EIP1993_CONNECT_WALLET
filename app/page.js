"use client";
import React, { useState } from "react";
import useEIP1193Provider from "@/Providers";

const WalletConnect = () => {
  const { account, balance, getBalance, chainId, connectWallet } =
    useEIP1193Provider();
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [inputBalance, setInputBalance] = useState(""); // State to store balance of input address

  const handleGetBalance = async () => {
    if (inputAddress) {
      setLoading(true);
      const fetchedBalance = await getBalance(inputAddress);
      setInputBalance(fetchedBalance);
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  };

  return (
    <div className="container h-screen flex flex-col justify-center mx-auto p-4 max-w-2xl">
      {account ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Connected Account:</p>
            <p className="font-mono bg-gray-100 text-black p-2 rounded text-sm break-all">
              {account}
            </p>
          </div>
          <div>
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="Enter Wallet Address"
              className="p-2 border rounded"
            />
            <button
              onClick={handleGetBalance}
              className="ml-2 p-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Balance"}
            </button>
          </div>

          {inputBalance && (
            <div>
              <p className="text-sm text-primary mb-1">Queried Account Balance:</p>
              <p className="text-2xl font-bold text-white">Balance: {inputBalance}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-primary mb-1">Connected Account Balance:</p>
            <p className="text-2xl font-bold text-white">Balance: {balance}</p>
          </div>

          <div>
            <p className="text-sm text-primary mb-1">Connected Network:</p>
            <p className="text-2xl font-bold text-primary">
              {chainId ? `Network ID: ${chainId}` : "Unknown Network"}
            </p>
          </div>
        </div>
      ) : (
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
