import Header from "../../components/header/header";
import SubHeader from "../../components/header/subheader";
import ActiveJobPostings from "./ListActivePostings";
import JobPostingForm from "./JobPostingForm";
import { useState } from "react";

const companyViewStatesArray = ["New", "Active", "Archive"];


const CompanyView = () => {
  const [companyViewState, setCompanyViewState] = useState("Active");

  const CompanyViewHeader = () => {
    return (
      <SubHeader
        statesArray={companyViewStatesArray}
        headerState={companyViewState}
        setHeaderState={setCompanyViewState}
      />
    );
  };

  const RenderSubpage = ({ viewState }: { viewState: string }) => {
    switch (viewState) {
      case "New":
        return (
          <div>
        <JobPostingForm />
        </div>);
      case "Active":
        return <ActiveJobPostings />;
      case "Archive":
        return <p>Not yet Implemented</p>;
      default:
        return <p>Company View State Default</p>;
    }
  };

  return (
    <div>
      <Header />
      <CompanyViewHeader />
      <RenderSubpage viewState={companyViewState} />
    </div>
  );
};

export default CompanyView;
