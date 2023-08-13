import React, { useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";

const JobPostingForm = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

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
    console.log("Handle Submit of FOrm");
    console.log(usdAmount, ethAmount, jobDescription, jobTitle, companyName);
    setUsdAmount(0);
    setEthAmount(0);
    setJobDescription("");
    setJobTitle("");
    setCompanyName("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex w-full flex-col justify-center items-center rounded-md shadow-md p-2 bg-white">
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
          className="bg-sky-500 w-full text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JobPostingForm;
