import React, { useEffect, useState } from "react";
import { USD_TO_ETH } from "../../utils/usdToEth";
import mockJobPostings from "./jobPostingsMockData";
import { Candidate, ExpandedJobPosting } from "../../types/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ExpandCollapseToggle = ({
  isExpanded,
  handleToggle,
}: {
  isExpanded: boolean;
  handleToggle: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="rounded-full w-12 h-12 flex justify-center items-center align-middle hover:bg-gray-600 hover:text-white text-bold"
      onClick={handleToggle}
    >
      <p>
        {isExpanded ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </p>
    </div>
  );
};

const DisplaySingleScore = ({
  scoreName,
  score,
}: {
  score: number;
  scoreName: string;
}) => {
  return (
    <div className="flex flex-col ml-4 mr-4 items-center text-center ">
      <h2 className="">{scoreName}</h2> <p className="font-bold">{score}</p>
    </div>
  );
};
const CandidateScores = ({
  backedAmount,
  backersCount,
}: {
  backedAmount: number;
  backersCount: number;
}) => {
  return (
    <div className="flex flex-row justify-between">
      <DisplaySingleScore score={backersCount} scoreName="No. Backers" />
      <DisplaySingleScore score={backedAmount} scoreName="Backing (USD)" />
      <DisplaySingleScore
        score={backersCount * backedAmount}
        scoreName="Score"
      />
    </div>
  );
};

const DisplayCandidate = ({ candidate }: { candidate: Candidate }) => {
  return (
    <li key={candidate.id} className="mb-3">
      <div className="flex flex-row items-center">
        <input type="checkbox" className="mr-2" />
        <a href={candidate.portfolioLink} className="text-blue-500 pl-2 pr-2">
          {candidate.name}
        </a>
        <CandidateScores
          backedAmount={candidate.backedAmount}
          backersCount={candidate.backersCount}
        />
      </div>
    </li>
  );
};

const JobListItemContent = ({
  jobPosting,
  expandedJobId,
  handleJobClick,
}: {
  jobPosting: ExpandedJobPosting;
  expandedJobId: number | null;
  handleJobClick: Function;
}) => {
  return (
    <>
      <a className="text-sky-500 m-3">{jobPosting.title}</a>
      <div className="flex justify-between">
        <div className="flex flex-row">
          <div className="text-gray-500 m-3">
            Suggestions: {jobPosting.suggestions}
          </div>
          <div className="text-gray-500 m-3">
            Cumulatively Backed by:{" "}
            {(jobPosting.backedTokens / USD_TO_ETH).toFixed(2)} (USD)
          </div>
        </div>
        <ExpandCollapseToggle
          isExpanded={expandedJobId === jobPosting.id}
          handleToggle={() => handleJobClick(jobPosting.id)}
        />
      </div>
    </>
  );
};

const EndSearchButton = ({
  onSelectAndCloseSearch,
}: {
  onSelectAndCloseSearch: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="mt-4">
      <button
        className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded"
        onClick={onSelectAndCloseSearch}
      >
        Select and Close Search
      </button>
      <p className="text-gray-400 mt-2">
        Select ticked candidates, close the contract, and pay out helpful
        hunters.
      </p>
    </div>
  );
};

const JobListItemDetailContent = ({
  jobPosting,
  onSelectAndCloseSearch,
}: {
  jobPosting: ExpandedJobPosting;
  onSelectAndCloseSearch: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">
        Your Bounty: ${jobPosting.bountyUSD.toFixed(2)} (USD)
      </h2>
      <h3 className="text-md font-medium mb-2">Candidates:</h3>
      <ul>
        {jobPosting.candidates.map((candidate) => (
          <DisplayCandidate key={candidate.id} candidate={candidate} />
        ))}
      </ul>
      <EndSearchButton onSelectAndCloseSearch={onSelectAndCloseSearch} />
    </div>
  );
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

  const onSelectAndCloseSearch = () => {
    // Handle selcet Candidates.
    setExpandedJobId(null);
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
            onClick={() => {
              if (expandedJobId !== jobPosting.id) {
                handleJobClick(jobPosting.id);
              }
            }}
          >
            <JobListItemContent
              jobPosting={jobPosting}
              expandedJobId={expandedJobId}
              handleJobClick={handleJobClick}
            />
            {expandedJobId === jobPosting.id && (
              <JobListItemDetailContent
                jobPosting={jobPosting}
                onSelectAndCloseSearch={onSelectAndCloseSearch}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveJobPostings;
