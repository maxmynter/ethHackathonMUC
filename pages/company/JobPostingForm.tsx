import React, { useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

const LUaddress = "0x76200A7A3f647C64d7ec3ce0D2df2D5Ae804A81c";

const abi = require("./abi.json");

const JobPostingForm = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { address, connector, isConnected } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: LUaddress,
    abi: abi,
    functionName: "createOffer",
    // Post some mock data for now
    args: [
      "0x0123456789012345678901234567890001234567890123456789012345678901",
      BigInt(1000000000000),
      BigInt(10000000000),
      1,
      BigInt(10000000),
    ],
    account: address,
    value: BigInt(1000000000000),
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const usdToEthConversionRate = USD_TO_ETH;

  const handleUsdChange = (event: any) => {
    const newUsdAmount = event.target.value;
    setUsdAmount(newUsdAmount);
    setEthAmount(
      (parseFloat(newUsdAmount) * usdToEthConversionRate).toFixed(2)
    );
  };

  const handleEthChange = (event: any) => {
    const newEthAmount = event.target.value;
    setEthAmount(newEthAmount);
    setUsdAmount(
      (parseFloat(newEthAmount) / usdToEthConversionRate).toFixed(2)
    );
  };

  const clearForm = () => {
    setUsdAmount(String(0));
    setEthAmount(String(0));
    setJobDescription("");
    setJobTitle("");
    setCompanyName("");
  };

  const handleSubmit = () => {
    console.log(usdAmount, ethAmount, jobDescription, jobTitle, companyName);
    try {
      if (write) {
        write();
      }
    } catch (error) {
      console.error(error);
    } finally {
      clearForm();
    }
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
            rows={Number("5")}
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
