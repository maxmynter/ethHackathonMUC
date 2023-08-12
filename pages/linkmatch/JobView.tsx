import { useState } from "react";
import mockData from "../../utils/mockData";

const JobPost = ({ job }) => {
  return (
    <div>
      <div className="flex flex-col">
        <h3>{job.title}</h3>
      </div>
    </div>
  );
};

const JobView = () => {
  const [setSelectedJob, selectedJob] = useState(null);

  return (
    <div className="bg-white flex-1 w-full h-full m-3 p-3">
      <h3 className="font-bold text-2xl text-center">Select a job...</h3>

      <div className="flex flex-col">
        {mockData.jobPostings.map((job) => (
          <JobPost job={job} key={job.id} onPress={() => setSelectedJob(job)} />
        ))}
      </div>
    </div>
  );
};

export default JobView;
