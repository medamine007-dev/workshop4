export interface Suggestion {
  id: number;
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  votes: number;
  category: string;
  nbLikes: number;
}
