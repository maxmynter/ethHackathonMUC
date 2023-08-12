export interface HeaderButtonObject {
  text: string;
  linkTo: string;
}

interface Candidate {
  id: number;
  name: string;
  selfDescription?:string
  portfolioLink: string | string[];
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
  companyName: string;
  suggestions?: number;
  backedTokens?: number;
  backedByN?: number;
  searchQuery?: string;
}
