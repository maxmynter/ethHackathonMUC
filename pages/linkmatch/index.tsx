import Header from "../../components/header";
import mockData from "../../utils/mockData";

const JobView = () => {
  return (
    <div className="bg-white flex-1 w-full h-full m-3 p-3">
      <h3 className="font-bold text-2xl text-center">Jobs</h3>
    </div>
  );
};

const CandidateView = () => {
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
  return (
    <div className="flex flex-col h-full">
      <div>
        <Header />
      </div>

      <div className=" bg-slate-100 flex-1 flex flex-col">
        <div className="h-20 text-center">Hello!</div>
        <div className="container mx-auto grid gap-4 grid-cols-2 grid-rows-1 flex-1">
          <JobView />
          <CandidateView />
        </div>
      </div>
    </div>
  );
};

export default LinkMatchView;
