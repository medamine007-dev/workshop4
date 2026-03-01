import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../shared/models/suggestion.model';
import { SuggestionService } from '../../../shared/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnInit, OnChanges {

  suggestions: Suggestion[] = [];
  filteredSuggestions: Suggestion[] = [];
  activeFilter: string = 'all';

  filters = [
    { key: 'all', label: 'Toutes' },
    { key: 'pending', label: 'En attente' },
    { key: 'approved', label: 'Approuvées' },
    { key: 'rejected', label: 'Rejetées' }
  ];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getAll();
    this.filteredSuggestions = this.suggestions;
  }

  // Refresh list when returning from form
  ngOnChanges(): void {
    this.suggestions = this.suggestionService.getAll();
    this.setFilter(this.activeFilter);
  }

  // Partie2 - Section 3a : bouton Details → charge SuggestionDetailsComponent via navigation impérative
  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  addSuggestion(): void {
    this.router.navigate(['/suggestions', 'add']);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredSuggestions = this.suggestions;
    } else {
      this.filteredSuggestions = this.suggestions.filter(s => s.status === filter);
    }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'status-pending',
      approved: 'status-approved',
      rejected: 'status-rejected'
    };
    return map[status] || '';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'En attente',
      approved: 'Approuvée',
      rejected: 'Rejetée'
    };
    return map[status] || status;
  }
}
