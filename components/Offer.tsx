import { ethers } from "ethers";
import * as React from "react";
import {
  useAccount,
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";

export const OFaddress = "0x8D8C6e1214B48429F7dfF84617D7C7F3f6E228A5"
export const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_data",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_bounty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minBet",
          "type": "uint256"
        },
        {
          "internalType": "uint16",
          "name": "_nWinners",
          "type": "uint16"
        },
        {
          "internalType": "uint256",
          "name": "_expirationTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "ApplicantSelection",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "etherValue",
          "type": "uint256"
        }
      ],
      "name": "Bet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "matchmaker",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Claim",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "Match",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "OfferAccepted",
      "type": "event"
    },
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "offer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bounty",
          "type": "uint256"
        }
      ],
      "name": "Reclaim",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "acceptOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bounty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "minShares",
          "type": "uint256"
        }
      ],
      "name": "buyShares",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "totalShares",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalEther",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "etherIn",
          "type": "uint256"
        }
      ],
      "name": "calculateShares",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "claimBounty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "data",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "etherValueOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "etherValue",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "expirationTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isClosed",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "matchDataOf",
      "outputs": [
        {
          "internalType": "bool",
          "name": "applicantAck",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "posterAck",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalShares",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "etherValue",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minBet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfWinners",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
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
      "inputs": [
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "reclaimBounty",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "selectApplicant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "matchmaker",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "sharesOwnedOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "shares",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "totalSharesOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalShares",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
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
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ] as const

  export function BuyShares() {
    const { address, connector, isConnected } = useAccount()
  
    const { config,
      error: prepareError,
      isError: isPrepareError,
    } = usePrepareContractWrite({
      address: OFaddress,
      abi: abi,
      functionName: "buyShares",
      args: ["0xb93cdcc4280bd94b5c85d912fF8961015456D3d0", BigInt(7)],
      account: address,
      value: BigInt(10000000000)
      })
  
    const { data, error, isError, write } = useContractWrite(config)
  
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    return (
      <div>
        <button disabled={!write || isLoading} onClick={() => write()}>
          {isLoading ? 'Buying shares...' : 'Buy shares / Stake'}
        </button>
        {isSuccess && (
          <div>
            Successfully bought shares!
            <div>
              <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    )
  }