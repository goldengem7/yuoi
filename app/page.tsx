"use client"; // 🔥 this tells Next.js this file is a Client Component

import ConnectWallet from "../components/ConnectWallet";
import { useState } from "react";
import { useSendTransaction, useConnection, useSwitchChain } from "wagmi";
import { parseEther } from "viem";
import { baseSepolia } from "wagmi/chains";

export default function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ✅ Hooks must be inside the component function
  const { isConnected, chainId } = useConnection();
  const { sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();

  const handleSubmit = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    if (chainId !== baseSepolia.id) {
      try {
        await switchChain({ chainId: baseSepolia.id });
        alert("Switched to Base Sepolia. Please retry.");
        return;
      } catch (err) {
        alert("Please manually switch your wallet to Base Sepolia.");
        return;
      }
    }

    await sendTransaction({
      to: "0x0000000000000000000000000000000000000000",
      value: parseEther("0.001"),
    });
    setSubmitted(true);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center text-white animate-[gradientBackground_10s_infinite]"
      onClick={() => setSubmitted(false)}
    >
      <ConnectWallet />
      {!submitted ? (
        <div
          className="p-6 bg-gray-800 rounded-lg shadow-lg animate-[fadeIn_400ms_ease-in]"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-2xl mb-4">Enter your name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-black w-64"
            placeholder="Your name..."
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
          >
            Submit & Animate
          </button>
        </div>
      ) : (
        <h1 className="text-4xl font-bold animate-[colorGlow_3s_infinite]">
          Welcome, {name}!
        </h1>
      )}
    </main>
  );
}
