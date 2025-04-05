export interface Portfolio {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  tags: string[];
  features?: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: string;
}
