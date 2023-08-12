import React, { useEffect, useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";
import mockJobPostings from "./jobPostingsMockData";
import { ExpandedJobPosting } from "../../types/global";

const CandidateScore = ({
  backedAmount,
  backersCount,
}: {
  backedAmount: number;
  backersCount: number;
}) => {
  return <p>{backedAmount * backersCount}</p>;
};

const ActiveJobPostings = () => {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [jobPostings, setJobPostings] = useState<ExpandedJobPosting[]>([]);

  const handleJobClick = (jobId: number) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  useEffect(() => {
    setJobPostings(mockJobPostings);
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Open Job Postings</h1>
      <ul>
        {jobPostings.map((jobPosting) => (
          <li
            key={jobPosting.id}
            className="p-4 border mb-4 cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={() => handleJobClick(jobPosting.id)}
          >
            <a href={`/job/${jobPosting.id}`} className="text-sky-500 m-3">
              {jobPosting.title}
            </a>
            <div className="flex flex-row">
              <div className="text-gray-500 m-3">
                Suggestions: {jobPosting.suggestions}
              </div>
              <div className="text-gray-500 m-3">
                Cumulatively Backed by:{" "}
                {(jobPosting.backedTokens / USD_TO_ETH).toFixed(2)} (USD)
              </div>
            </div>
            {expandedJobId === jobPosting.id && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">
                  Bounty: ${jobPosting.bountyUSD.toFixed(2)} (USD)
                </h2>
                <h3 className="text-md font-medium mb-2">Candidates:</h3>
                <ul>
                  {jobPosting.candidates.map((candidate) => (
                    <li key={candidate.id} className="mb-3">
                      <input type="checkbox" className="mr-2" />
                      <a
                        href={candidate.portfolioLink}
                        className="text-blue-500"
                      >
                        {candidate.name}
                      </a>
                      <CandidateScore
                        backedAmount={candidate.backedAmount}
                        backersCount={candidate.backersCount}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <button className="bg-sky-500 text-white py-2 px-4 rounded">
                    Select and Close Search
                  </button>
                  <p className="text-gray-400 mt-2">
                    Select ticked candidates, close the contract, and pay out
                    helpful hunters.
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveJobPostings;
