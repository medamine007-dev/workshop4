import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../shared/models/suggestion.model';
import { SuggestionService } from '../../../shared/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.scss']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion: Suggestion | undefined;
  id!: number;

  constructor(
    // Partie2 - Section 3b : récupération de l'id avec le service ActivatedRoute
    private activatedRoute: ActivatedRoute,
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'id depuis les paramètres de route
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // Le + convertit la string en number
      this.suggestion = this.suggestionService.getById(this.id);
    });
  }

  // Partie2 - Section 3b : lien "back to list" retour vers la liste
  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'En attente',
      approved: 'Approuvée',
      rejected: 'Rejetée'
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}
