 "use client"
// import React, { useState } from "react";
// import useEIP1193Provider from "@/Providers";
// // import { Toaster } from "@shadcn/ui"; // Import Toaster to display notifications

// const Connection = () => {
//   const { connectWallet, account, balance, chainId } = useEIP1193Provider();
//   const [inputAddress, setInputAddress] = useState("");

//   // Event handler to update the input value
//   const handleInputChange = (e) => {
//     setInputAddress(e.target.value);
//   };

//   // Display the wallet connection info and balance
//   return (
//     <div className="App">
//       <header>
//         <h1>Ethereum Wallet Connection</h1>
//         {account ? (
//           <div>
//             <p>Connected account: {account}</p>
//             <p>Balance: {balance} ETH</p>
//             <p>Chain ID: {chainId}</p>
//             <input
//               type="text"
//               value={inputAddress}
//               onChange={handleInputChange}
//               placeholder="Enter an Ethereum address"
//             />
//             <button onClick={balance}>Show Balance</button>
//             <p>{balance}</p>
//           </div>
//         ) : (
//           <button onClick={connectWallet}>Connect Wallet</button>
//         )}
//       </header>

//       {/* Render Toaster component to display notifications */}
//       {/* <Toaster /> */}
//     </div>
//   );
// };

// export default Connection;

import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertCircle } from "lucide-react";
import useEIP1193Provider from "@/Providers";
const WalletConnect = () => {
  const { provider, account, balance, chainId, connectWallet } =
    useEIP1193Provider();
  const [loading, setLoading] = useState(false);

  // Handle connecting wallet
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
                <p className="text-sm text-primary mb-1">Account Balance:</p>
                <p className="text-2xl font-bold text-white">
                  Balance:{balance}
                </p>
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
              className="w-full"
              onClick={handleConnect}
              disabled={loading}
            >
              {/* {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Connect Wallet"
              )} */}
              Connect Wallet
            </button>
          )}
    </div>
  );
};

export default WalletConnect;
