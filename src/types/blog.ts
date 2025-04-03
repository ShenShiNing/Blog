export interface Blog {
  id: string;
  author: string;
  category: string;
  title: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
  createdDate: string;
  content?: string;
  readTime?: string;
}
