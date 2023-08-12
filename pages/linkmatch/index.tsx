import React, { useState } from "react";
import Header from "../../components/header/header";
import { Candidate, ExpandedJobPosting } from "../../types/global";

import CandidateView from "./CandidateView";
import ListView from "./ListView";
import mockData from "../../utils/mockData";

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
          <ListView
            typeOfData="Job"
            data={mockData.jobPostings}
            selected={selectedJob}
            setSelected={setSelectedJob}
          />
          <ListView
            typeOfData="Candidate"
            data={mockData.candidates}
            selected={selectedCandidate}
            setSelected={setSelectedCandidate}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkMatchView;
