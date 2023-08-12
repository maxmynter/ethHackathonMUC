import ExpandCollapseToggle from "../../components/header/toggle";
import React, { useState } from "react";
import { Candidate } from "../../types/global";
import Link from "next/link";

const CandidatePost = ({
  candidate,
  selectedCandidate,
  onPress,
}: {
  candidate: Candidate;
  selectedCandidate: Candidate | null;
  onPress: Function;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const candidateIsSelectedcandidate: boolean =
    selectedCandidate !== null && candidate.id === selectedCandidate.id;
  return (
    <div
      className={`${
        !candidateIsSelectedcandidate ? "hover:bg-slate-50" : ""
      }   ${candidateIsSelectedcandidate ? "bg-slate-300" : ""}`}
    >
      <div
        className={`flex flex-row items-center justify-between ${
          candidateIsSelectedcandidate ? "border-gray-600 border-b" : ""
        }`}
      >
        <div className="w-full p-3 cursor-pointer" onClick={() => onPress()}>
          <div className="flex flex-col">
            <h3 className="font-bold">{`${candidate.name}`}</h3>
            <div className="flex flex-row justify-between">
              <p>Staked Already: ${candidate.backedAmount} USD</p>
              <p>Backed by: {candidate.backersCount} People</p>
            </div>
          </div>
        </div>
        <ExpandCollapseToggle
          isExpanded={isExpanded}
          handleToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>
      {isExpanded && (
        <div className="p-3">
          <p>{candidate.selfDescription}</p>
          {typeof candidate.portfolioLink === "string" ? (
            <Link href={candidate.portfolioLink}> Portfolio</Link>
          ) : (
            candidate.portfolioLink.map((pfLink) => (
              <Link key={pfLink} href={pfLink}>
                {pfLink}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CandidatePost;
