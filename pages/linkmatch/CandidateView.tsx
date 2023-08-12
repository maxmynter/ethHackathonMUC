import mockData from "../../utils/mockData";
import React, { Dispatch, SetStateAction } from "react";
import { Candidate } from "../../types/global";

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

export default CandidateView;
