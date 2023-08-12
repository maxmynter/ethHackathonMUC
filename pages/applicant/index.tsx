import React, { useState } from "react";
import Header from "../../components/header/header";
import { JobPosting } from "../../types/global";

const ApplicationModal = ({ onSubmit }: { onSubmit: Function }) => {
  const [portfolioRows, setPortfolioRows] = useState([{ title: "", link: "" }]);

  const addRow = () => {
    setPortfolioRows([...portfolioRows, { title: "", link: "" }]);
  };

  const handleTitleChange = (index: number, value: string) => {
    const updatedRows = [...portfolioRows];
    updatedRows[index].title = value;
    setPortfolioRows(updatedRows);
  };

  const removeRow = (index: number) => {
    const updatedRows = portfolioRows.filter((_, i) => i !== index);
    setPortfolioRows(updatedRows);
  };

  const handleLinkChange = (index: number, value: string) => {
    const updatedRows = [...portfolioRows];
    updatedRows[index].link = value;
    setPortfolioRows(updatedRows);
  };

  const handleSubmit = () => {
    onSubmit();
    // Perform your search request logic here
  };

  return (
    <div className=" max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg mb-11">
      <h2 className="text-xl font-semibold mb-4">
        How does your dream job look like?
      </h2>
      <form>
        <label htmlFor="jobTitle" className="block font-medium mb-2">
          What Role are you looking for?
        </label>
        <input
          type="text"
          id="jobTitle"
          className="w-full mb-4 p-2 border rounded"
        />

        <label htmlFor="description" className="block font-medium mb-2">
          Introduce yourself briefly (max.250 words):
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full mb-4 p-2 border rounded"
        />
        <label className="block font-medium mb-2">
          Add Links to your Work:
        </label>
        {portfolioRows.map((row, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              placeholder={`Portfolio Title`}
              className="w-1/2 p-2 border rounded mr-2"
              value={row.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />
            <input
              type="text"
              placeholder="Link"
              className="w-1/2 p-2 border rounded mr-2"
              value={row.link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
            <button
              type="button"
              className="bg-red-400 hover:bg-red-600 text-white rounded py-2 px-3"
              onClick={() => removeRow(index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white  w-full rounded py-2 px-4 mt-2 mb-4"
          onClick={addRow}
        >
          Add New Row
        </button>

        <label htmlFor="mail" className="block font-medium mb-2">
          Contact E-Mail:
        </label>
        <input
          type="text"
          id="mail"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="button"
          className="bg-sky-500 text-white w-full rounded py-2 px-4 mt-4"
          onClick={handleSubmit}
        >
          Submit Search Request
        </button>
      </form>
    </div>
  );
};
const ReferredJobsList = ({ jobs }: { jobs: JobPosting[] }) => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Referred Jobs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 border-b border-gray-400">
              Company
            </th>
            <th className="text-left py-2 px-4 border-b border-gray-400">
              Position
            </th>
            <th className="text-left py-2 px-4 border-b border-gray-400">
              Tokens Vouched
            </th>
            <th className="text-left py-2 px-4 border-b border-gray-400">
              People Vouched
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-gray-400 py-2 px-4">
                No referrals yet
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.companyName}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.backedTokens}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.backedByN}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const SuccessModal = ({ closeModal }: { closeModal: Function }) => {
  const onClose = () => {
    closeModal();
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <div className="text-4xl mb-2">🎉</div>
        <p className="text-lg">Application submitted</p>
        <p className="font-semibold mt-2">Good luck!</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ApplicantView = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <>
      <Header />
      {applicationSubmitted ? (
        <>
          {showSuccessModal && (
            <SuccessModal closeModal={() => setShowSuccessModal(false)} />
          )}
          <ReferredJobsList jobs={[]} />
        </>
      ) : (
        <ApplicationModal
          onSubmit={() => {
            setApplicationSubmitted(true);
            setShowSuccessModal(true);
          }}
        />
      )}
    </>
  );
};

export default ApplicantView;
