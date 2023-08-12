import { useState } from "react";
import { ExpandedJobPosting } from "../../types/global";
import mockData from "../../utils/mockData";

const JobPost = ({
  job,
  selectedJob,
}: {
  job: ExpandedJobPosting;
  selectedJob: ExpandedJobPosting;
}) => {
  return (
    <div>
      <div
        className={`flex flex-col hover:bg-slate-50 cursor-pointer p-3 ${
          job.id === selectedJob.id ? "bg-slate-400" : ""
        }`}
      >
        <h3 className="font-bold">{job.title}</h3>
        <p>Bounty: ${job.bountyUSD} USD</p>
      </div>
    </div>
  );
};

const JobView = () => {
  const [setSelectedJob, selectedJob] = useState(null);

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
