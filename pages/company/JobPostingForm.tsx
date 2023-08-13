import React, { useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

const LUaddress = "0x76200A7A3f647C64d7ec3ce0D2df2D5Ae804A81c";

const abi = [
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_vault",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_proposalFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bounty",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "deployer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "applicantProfile",
        "type": "address"
      }
    ],
    "name": "ApplicantProfileCreation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "by",
        "type": "address"
      }
    ],
    "name": "MinimumMatchProposalFeeChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "by",
        "type": "address"
      }
    ],
    "name": "MinimumOfferBountyChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "poster",
        "type": "address"
      },
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minBet",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "numberOfWinners",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "OfferCreation",
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
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "by",
        "type": "address"
      }
    ],
    "name": "VaultChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_DURATION",
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
    "name": "MIN_DURATION",
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
    "name": "MIN_MATCH_PROPOSAL_FEE",
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
    "name": "MIN_OFFER_BOUNTY",
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
    "name": "VAULT",
    "outputs": [
      {
        "internalType": "address payable",
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
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "changeMinimumMatchProposalFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bounty",
        "type": "uint256"
      }
    ],
    "name": "changeMinimumOfferBounty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_vault",
        "type": "address"
      }
    ],
    "name": "changeVaultAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createApplicantProfile",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
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
    "name": "createApplicantProfileWithData",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
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
        "name": "_duration",
        "type": "uint256"
      }
    ],
    "name": "createOffer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "offer",
        "type": "uint256"
      }
    ],
    "name": "deleteOffer",
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
      }
    ],
    "name": "deployerOfApplicant",
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
    "name": "numberOfOffers",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "offers",
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
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;

const JobPostingForm = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { address, connector, isConnected } = useAccount()

  const { config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: LUaddress,
    abi: abi,
    functionName: "createOffer",
    // Post some mock data for now
    args: ["0x0123456789012345678901234567890001234567890123456789012345678901", BigInt(1000000000000), BigInt(10000000000), 1, BigInt(10000000)],
    account: address,
    value: BigInt(1000000000000)
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const usdToEthConversionRate = USD_TO_ETH;

  const handleUsdChange = (event) => {
    const newUsdAmount = event.target.value;
    setUsdAmount(newUsdAmount);
    setEthAmount(
      (parseFloat(newUsdAmount) * usdToEthConversionRate).toFixed(2)
    );
  };

  const handleEthChange = (event) => {
    const newEthAmount = event.target.value;
    setEthAmount(newEthAmount);
    setUsdAmount(
      (parseFloat(newEthAmount) / usdToEthConversionRate).toFixed(2)
    );
  };

  const handleSubmit = () => {
    console.log("Handle Submit of Form");
    console.log(usdAmount, ethAmount, jobDescription, jobTitle, companyName);
    write();
    setUsdAmount(0);
    setEthAmount(0);
    setJobDescription("");
    setJobTitle("");
    setCompanyName("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex w-full flex-col justify-center items-center rounded-md shadow-md p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-4 w-full">
          Create a New Job Posting
        </h1>

        <div className="mb-4 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="compname"
          >
            Company Name:
          </label>
          <input
            id="compname"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            name="header"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Who is searching? 🕵️"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="header"
          >
            Headline
          </label>
          <input
            id="header"
            name="header"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter job headline..."
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="body"
          >
            Job Description
          </label>
          <textarea
            id="body"
            name="body"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            rows="5"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter job description..."
          ></textarea>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="usdAmount"
            >
              Bounty (USD)
            </label>
            <input
              id="usdAmount"
              name="usdAmount"
              type="number"
              value={usdAmount}
              onChange={handleUsdChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter bounty height in USD..."
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="ethAmount"
            >
              Bounty (ETH)
            </label>
            <input
              id="ethAmount"
              name="ethAmount"
              type="number"
              value={ethAmount}
              onChange={handleEthChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter bounty height in ETH..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-sky-500 w-full text-white font-bold px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleSubmit}
        >
          Create Job Posting
        </button>
      </div>
    </div>
  );
};

export default JobPostingForm;