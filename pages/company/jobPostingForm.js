import React, { useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";

const JobPostingForm = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create a New Job Posting</h1>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="header"
        >
          Headline
        </label>
        <input
          id="header"
          name="header"
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter job headline..."
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="body"
        >
          Job Description
        </label>
        <textarea
          id="body"
          name="body"
          rows="5"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter job description..."
        ></textarea>
      </div>

      <div className="flex flex-row justify-between">
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
        className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit
      </button>
    </div>
  );
};

export default JobPostingForm;