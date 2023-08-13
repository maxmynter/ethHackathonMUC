import React, { useState } from "react";
import Header from "../../components/header/header";
import { Candidate, ExpandedJobPosting } from "../../types/global";

import ListView from "./ListView";
import mockData from "../../utils/mockData";

let N_MATCHER_TOKENS = 712;

const MatchHeader = ({
  selectedJob,
  selectedCandidate,
}: {
  selectedJob: ExpandedJobPosting | null;
  selectedCandidate: Candidate | null;
}) => {
  const [amountStaked, setAmountStaked] = useState<number>(0);

  const handleSubmit = () => {
    if (selectedCandidate && selectedJob && amountStaked > 0) {
      console.log("Submitted Matching");
      N_MATCHER_TOKENS = N_MATCHER_TOKENS - amountStaked;
      setAmountStaked(0);
    }
  };

  const getPayoutIfSuccess = (): string => {
    if (selectedJob && selectedJob.backedTokens && selectedCandidate) {
      return Number(
        selectedJob.bountyUSD *
          (amountStaked / (amountStaked + selectedJob.backedTokens)) *
          (1 / selectedCandidate.backersCount)
      ).toFixed(2);
    } else {
      return String(0);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center rounded-md shadow-md p-2 bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="mx-2">
          <label className="m-2">Stake: </label>
          <input
            type="number"
            value={amountStaked}
            onChange={(event) => setAmountStaked(Number(event.target.value))}
            placeholder="Amount to Stake for referral"
            className="border border-gray-400"
          />
        </div>
        <div className="mx-2 flex flex-row">
          <p className="m-2">Available Funds: </p>
          <p className="m-2 font-bold">{` ${N_MATCHER_TOKENS} USD`}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <p className=" m-2">Success Payout:</p>
        <p className=" m-2 font-bold">{` ${getPayoutIfSuccess()} USD`}</p>
      </div>
      <button
        className={`${
          selectedCandidate && selectedJob && amountStaked > 0
            ? "bg-sky-500"
            : "bg-gray-300"
        } mx-3 mt-2 rounded p-2 text-white w-64`}
        onClick={handleSubmit}
      >
        Match
      </button>
      <p className="text-sm text-gray-400">Placing this Match costs 0.2 USD</p>
    </div>
  );
};

const LinkMatchView = () => {
  const [selectedJob, setSelectedJob] = useState<ExpandedJobPosting | null>(
    null
  );

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div>
        <Header />
      </div>
      <MatchHeader
        selectedJob={selectedJob}
        selectedCandidate={selectedCandidate}
      />
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto grid gap-4 grid-cols-2 grid-rows-1 flex-1">
          <ListView
            typeOfData="Job"
            data={mockData.jobPostings}
            selected={selectedJob}
            setSelected={setSelectedJob}
            title="Select a Job... "
          />
          <ListView
            typeOfData="Candidate"
            data={mockData.candidates}
            selected={selectedCandidate}
            setSelected={setSelectedCandidate}
            title="Select a Candidate... "
          />
        </div>
      </div>
    </div>
  );
};

export default LinkMatchView;
