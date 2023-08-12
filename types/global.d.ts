export interface HeaderButtonObject {
  text: string;
  linkTo: string;
}

interface Candidate {
  id: number;
  name: string;
  portfolioLink: string;
  backedAmount: number;
  backersCount: number;
}

interface ExpandedJobPosting extends JobPosting {
  bountyUSD: number;
  candidates: Candidate[];
}

interface JobPosting {
  id: number;
  title: string;
  suggestions: number;
  backedTokens: number;
}
