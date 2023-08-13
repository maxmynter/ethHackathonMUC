import { Candidate, ExpandedJobPosting } from "../types/global";

const candidatesByID = {
  johnDoe: {
    id: 1,
    name: "John Doe",
    portfolioLink: "/portfolio/1",
    backedAmount: 200,
    backersCount: 10,
  },
  janeSmith: {
    id: 2,
    name: "Jane Smith",
    portfolioLink: "/portfolio/2",
    backedAmount: 150,
    backersCount: 8,
  },
  aliceJohnson: {
    id: 3,
    name: "Alice Johnson",
    portfolioLink: "/portfolio/3",
    backedAmount: 120,
    backersCount: 7,
  },
  bobWilliams: {
    id: 4,
    name: "Bob Williams",
    portfolioLink: "/portfolio/4",
    backedAmount: 180,
    backersCount: 12,
  },
};

const jobPostings: ExpandedJobPosting[] = [
  {
    id: 1,
    title: "Software Engineer",
    companyName: "Google",
    suggestions: 5,
    backedTokens: 3.22,
    searchQuery: `About Us:
We are a dynamic and innovative [Company Name] seeking a skilled Software Engineer to join our talented tech team. Our company is dedicated to pushing the boundaries of technology, creating cutting-edge solutions that make a real impact in various industries.

Role Overview:
As a Software Engineer at [Company Name], you'll play a crucial role in designing, developing, and implementing software solutions that power our products and services. You'll collaborate closely with cross-functional teams to deliver high-quality code, solve complex technical challenges, and contribute to the continuous improvement of our technology stack.

Responsibilities:

    Design, code, and test software applications that meet user needs and business requirements.
    Collaborate with product managers, designers, and other developers to create innovative solutions.
    Debug and troubleshoot issues, optimize code, and ensure the scalability of applications.`,
    bountyUSD: 5000,
    candidates: [candidatesByID.johnDoe, candidatesByID.janeSmith],
  },
  {
    id: 2,
    companyName: "LinkedIn",
    title: "UI/UX Designer",
    suggestions: 3,
    searchQuery: `About Us:
At [Company Name], innovation is our hallmark. We're on the lookout for a talented UI/UX Designer to join our inventive team. Our company's commitment to pioneering technology results in cutting-edge solutions that drive progress across diverse sectors.

Role Overview:
As a UI/UX Designer at [Company Name], your creative prowess will shape the user experience of our products and services. Collaborating with multifaceted teams, you'll transform concepts into intuitive interfaces, seamlessly blending aesthetics and functionality.

Responsibilities:

    Develop visually appealing user interfaces that prioritize user experience and brand identity.`,
    backedTokens: 0.87,
    bountyUSD: 3000,
    candidates: [candidatesByID.aliceJohnson, candidatesByID.bobWilliams],
  },
  {
    id: 3,
    title: "Risk Analyst",
    companyName: "FTX",
    suggestions: 5,
    searchQuery: `About Us:
Join [Company Name], a trailblazing force committed to innovation. We're currently seeking a skilled Risk Analyst to complement our team. Our company's dedication to pushing boundaries yields pioneering solutions that catalyze progress in diverse industries.

Role Overview:
As a Risk Analyst at [Company Name], your expertise will play a pivotal role in assessing and mitigating potential risks. Collaborating closely with various teams, you'll contribute to informed decision-making and help secure the future success of our endeavors.

Responsibilities:

    Identify, evaluate, and manage risks to safeguard projects and initiatives.
    Collaborate with stakeholders to implement strategies that minimize potential negative impacts.`,
    backedTokens: 1.17,
    bountyUSD: 4200,
    candidates: [candidatesByID.aliceJohnson, candidatesByID.bobWilliams],
  },
];

const candidates: Candidate[] = Object.values(candidatesByID);

export default { jobPostings, candidatesByID, candidates };
