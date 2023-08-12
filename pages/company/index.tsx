import Header from "../../components/header";
import SubHeader from "../../components/subheader";
import ActiveJobPostings from "./ListActivePostings";
import JobPostingForm from "./jobPostingForm";
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
        return <JobPostingForm />;
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
