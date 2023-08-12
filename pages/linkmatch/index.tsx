import Header from "../../components/header";
const LinkMatchView = () => {
  return (
    <div className="flex flex-col  h-full">
      <div>
        <Header />
      </div>

      <div className="mt-3 bg-slate-100 flex-1">
        <div className="container mx-auto grid gap-4 grid-cols-2 grid-rows-1">
          <div className="bg-white flex-1 w-full m-3 p-3">Job here</div>
          <div className="bg-white flex-1 w-full m-3 p-3">Candidate here</div>
        </div>
      </div>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default LinkMatchView;
