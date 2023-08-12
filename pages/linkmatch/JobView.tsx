import React, { Dispatch, SetStateAction, useState } from "react";
import { ExpandedJobPosting } from "../../types/global";
import mockData from "../../utils/mockData";
import ExpandCollapseToggle from "../../components/header/toggle";
import { isExternal } from "util/types";

const JobPost = ({
  job,
  selectedJob,
  onPress,
}: {
  job: ExpandedJobPosting;
  selectedJob: ExpandedJobPosting | null;
  onPress: Function;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const jobIsSelectedJob: boolean =
    selectedJob !== null && job.id === selectedJob.id;
  return (
    <div
      className={`${!jobIsSelectedJob ? "hover:bg-slate-50" : ""}   ${
        jobIsSelectedJob ? "bg-slate-300" : ""
      }`}
    >
      <div
        className={`flex flex-row items-center justify-between ${
          jobIsSelectedJob ? "border-gray-600 border-b" : ""
        }`}
      >
        <div className="w-full p-3 cursor-pointer" onClick={() => onPress()}>
          <div className="flex flex-col">
            <h3 className="font-bold">{`${job.title}${
              job.companyName ? ` --- ${job.companyName}` : ""
            }`}</h3>
            <div className="flex flex-row justify-between">
              <p>Bounty: ${job.bountyUSD} USD</p>
              <p>Staked Already: ${job.backedTokens} USD</p>
              <p>Backed by: {job.suggestions} People</p>
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
          <p>{job.searchQuery}</p>
        </div>
      )}
    </div>
  );
};

const JobView = ({
  selectedJob,
  setSelectedJob,
}: {
  selectedJob: ExpandedJobPosting | null;
  setSelectedJob: Dispatch<SetStateAction<ExpandedJobPosting | null>>;
}) => {
  return (
    <div className="bg-white flex-1 w-full h-full m-3">
      <h3 className="font-bold text-2xl text-center">Select a job...</h3>

      <div className="flex flex-col">
        {mockData.jobPostings.map((job: ExpandedJobPosting) => (
          <JobPost
            job={job}
            key={job.id}
            selectedJob={selectedJob}
            onPress={() => setSelectedJob(job)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobView;
