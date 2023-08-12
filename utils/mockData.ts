import { Candidate, ExpandedJobPosting } from "../types/global";

const jobPostings: ExpandedJobPosting[] = [
  {
    id: 1,
    title: "Software Engineer",
    suggestions: 5,
    backedTokens: 3.22,
    bountyUSD: 5000,
    candidates: [
      {
        id: 1,
        name: "John Doe",
        portfolioLink: "/portfolio/1",
        backedAmount: 200,
        backersCount: 10,
      },
      {
        id: 2,
        name: "Jane Smith",
        portfolioLink: "/portfolio/2",
        backedAmount: 150,
        backersCount: 8,
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    suggestions: 3,
    backedTokens: 0.87,
    bountyUSD: 3000,
    candidates: [
      {
        id: 3,
        name: "Alice Johnson",
        portfolioLink: "/portfolio/3",
        backedAmount: 120,
        backersCount: 7,
      },
      {
        id: 4,
        name: "Bob Williams",
        portfolioLink: "/portfolio/4",
        backedAmount: 180,
        backersCount: 12,
      },
    ],
  },
];

const candidates: Candidate[] = [];
jobPostings.forEach((job) => {
  job.candidates.forEach((candidate) => {
    candidates.push(candidate);
  });
});

export default { jobPostings, candidates };
