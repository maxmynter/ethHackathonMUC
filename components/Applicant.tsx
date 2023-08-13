import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

export const address = "0x1337"
export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "_data",
        "type": "bytes32[]"
      }
    ],
    "name": "addData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "_data",
        "type": "bytes32[]"
      }
    ],
    "name": "invalidateData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "isData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export function AddData() {
  const [data] = React.useState('')

  const { config } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "addData",
    // Mock data
    args: [["0x01234567890123456789012345678900", "0x01234567890123456789012345678901"]]
  })

  const { write } = useContractWrite(config);

  return (
    <form
      onSubmit={(e) => {
        write?.()
      }}
    >
      <input
        aria-label="Recipient"
        placeholder="test"
        value={data}
      />
      <button disabled={!data}>Send</button>
    </form>
  )
}