import { Injectable } from '@angular/core';
import { Suggestion } from '../models/suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Add Dark Mode Support',
      description: 'Implement a dark mode toggle for better user experience during night time usage. This would include full CSS variable overrides and localStorage persistence of the user preference.',
      author: 'Alice Martin',
      status: 'approved',
      date: '2025-01-15',
      votes: 142,
      category: 'UI/UX',
      nbLikes: 0
    },
    {
      id: 2,
      title: 'Improve Mobile Navigation',
      description: 'The current hamburger menu on mobile is hard to use. Propose a bottom tab navigation bar instead, following modern mobile UX patterns like Instagram or Twitter.',
      author: 'Bob Dupont',
      status: 'pending',
      date: '2025-02-03',
      votes: 87,
      category: 'Mobile',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Export Data as CSV',
      description: 'Allow users to export their data and reports as CSV files for further analysis in tools like Excel or Google Sheets. Should support filtering before export.',
      author: 'Clara Benali',
      status: 'pending',
      date: '2025-02-10',
      votes: 65,
      category: 'Feature',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Two-Factor Authentication',
      description: 'Add 2FA support via TOTP (Google Authenticator / Authy) to improve account security. Should be optional but highly recommended for admin accounts.',
      author: 'David Chen',
      status: 'approved',
      date: '2025-01-28',
      votes: 210,
      category: 'Security',
      nbLikes: 0
    },
    {
      id: 5,
      title: 'Notification System',
      description: 'Build a real-time notification system using WebSockets to alert users of important events such as new comments, status changes, or admin announcements.',
      author: 'Emma Rousseau',
      status: 'rejected',
      date: '2024-12-19',
      votes: 34,
      category: 'Feature',
      nbLikes: 0
    },
    {
      id: 6,
      title: 'Performance Dashboard',
      description: 'Create an analytics dashboard showing key performance indicators, user activity charts, and system health metrics using Chart.js or D3.js integration.',
      author: 'François Lambert',
      status: 'pending',
      date: '2025-02-14',
      votes: 99,
      category: 'Analytics',
      nbLikes: 0
    }
  ];

  getAll(): Suggestion[] {
    return this.suggestions;
  }

  getById(id: number): Suggestion | undefined {
    return this.suggestions.find(s => s.id === id);
  }

  addSuggestion(suggestion: Suggestion): void {
    const newId = this.suggestions.length > 0
      ? Math.max(...this.suggestions.map(s => s.id)) + 1
      : 1;
    this.suggestions.push({ ...suggestion, id: newId });
  }
}
