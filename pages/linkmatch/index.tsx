import React, { Dispatch, SetStateAction, useState } from "react";
import Header from "../../components/header/header";
import mockData from "../../utils/mockData";
import { Candidate, ExpandedJobPosting } from "../../types/global";

import JobView from "./JobView";

const CandidateView = ({
  selectedCandidate,
  setSelectedCandidate,
}: {
  selectedCandidate: Candidate | null;
  setSelectedCandidate: Dispatch<SetStateAction<Candidate | null>>;
}) => {
  const candidates = mockData.candidates;

  return (
    <div className="bg-white flex-1 w-full h-full m-3 p-3">
      <h3 className="font-bold text-2xl text-center">Candidates</h3>

      {candidates.map((candidate, i) => {
        return (
          <div className="p-2 " key={i}>
            {candidate.name}
          </div>
        );
      })}
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
    <div className="flex flex-col h-full">
      <div>
        <Header />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="container mx-auto grid gap-4 grid-cols-2 grid-rows-1 flex-1">
          <JobView selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
          <CandidateView
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkMatchView;
