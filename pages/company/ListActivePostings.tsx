import React from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";

interface JobPosting {
  id: number;
  title: string;
  suggestions: number;
  backedTokens: number;
}

const mockJobPostings: JobPosting[] = [
  { id: 1, title: "Software Engineer", suggestions: 5, backedTokens: 3.22 },
  { id: 2, title: "UI/UX Designer", suggestions: 3, backedTokens: 0.87 },
  // Add more mock data here
];

const ActiveJobPostings = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Open Job Postings</h1>
      <ul>
        {mockJobPostings.map((jobPosting) => (
          <li
            key={jobPosting.id}
            className="p-4 border mb-4 cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <a href={`/job/${jobPosting.id}`} className="text-sky-500 m-3">
              {jobPosting.title}
            </a>
            <div className="flex flex-row">
              <div className="text-gray-500 m-3">
                Suggestions: {jobPosting.suggestions}
              </div>
              <div className="text-gray-500 m-3">
                Cumulatively Backed by:
                {`  ${(jobPosting.backedTokens / USD_TO_ETH).toFixed(2)}`}
                (USD)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveJobPostings;
