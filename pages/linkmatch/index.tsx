import Header from "../../components/header";
const LinkMatchView = () => {
  return (
    <div>
      <Header />

      <div className=" bg-slate-100">
        <div className="content grid gap-4 grid-cols-2 grid-rows-1">
          <div className="bg-white flex-1 w-full m-3">Job here</div>
          <div className="bg-white flex-1 w-full m-3">Candidate here</div>
        </div>
      </div>
    </div>
  );
};

export default LinkMatchView;
