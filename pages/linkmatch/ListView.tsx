import React, { Dispatch, SetStateAction, useState } from "react";
import { ExpandedJobPosting, Candidate } from "../../types/global";
import JobPost from "./JobPost";
import CandidatePost from "./CandidatePost";

const ListView = ({
  selected,
  setSelected,
  data,
  typeOfData,
  title,
}: {
  selected: ExpandedJobPosting | Candidate | null;
  setSelected:
    | Dispatch<SetStateAction<ExpandedJobPosting | null>>
    | Dispatch<SetStateAction<Candidate | null>>;
  data: Array<ExpandedJobPosting | Candidate>;
  typeOfData: string;
  title: string;
}) => {
  return (
    <div className="bg-white flex-1 w-full h-full m-3 rounded-md shadow-md p-2">
      <h3 className="font-bold text-2xl text-center">{title}</h3>

      <div className="flex flex-col">
        {data?.map((item: ExpandedJobPosting | Candidate) => {
          if (typeOfData === "Job") {
            const job = item as ExpandedJobPosting;
            const setSelectedJob = setSelected as Dispatch<
              SetStateAction<ExpandedJobPosting | null>
            >;

            return (
              <JobPost
                job={job}
                key={job.id}
                selectedJob={selected as ExpandedJobPosting}
                onPress={() => setSelectedJob(job)}
              />
            );
          }
          if (typeOfData === "Candidate") {
            const candidate = item as Candidate;
            const setSelectedCandidate = setSelected as Dispatch<
              SetStateAction<Candidate | null>
            >;
            return (
              <CandidatePost
                key={candidate.id}
                candidate={candidate}
                selectedCandidate={selected as Candidate}
                onPress={() => setSelectedCandidate(candidate)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ListView;
