import { useState } from "react";
import { useConnect, useDisconnect, useConnection } from "wagmi";

export default function ConnectWallet() {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // useConnection provides connection state (replacement for useAccount)
  const { isConnected } = useConnection();

  // connectors and connect come from useConnect
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center space-y-4">
      {isConnected ? (
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded shadow-lg"
          onClick={() => disconnect()}
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded shadow-lg"
          onClick={() => setShowOptions((s) => !s)}
        >
          Connect Wallet
        </button>
      )}

      {showOptions && (
        <div
          className="mt-2 bg-gray-800 rounded-lg shadow-lg p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <select
            onChange={(e) => {
              const selected = e.target.value;
              const connector = connectors.find((c) => c.name === selected);
              if (connector) connect({ connector });
            }}
            className="w-full px-4 py-2 text-black rounded"
            defaultValue=""
          >
            <option value="">Select Wallet</option>
            {connectors.map((connector) => (
              <option key={connector.id} value={connector.name}>
                {connector.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
