import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../shared/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;

  categories = ['UI/UX', 'Mobile', 'Feature', 'Security', 'Analytics', 'Performance', 'Other'];

  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z]*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      author: [''],
      date: [{ value: this.today, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      const newSuggestion = {
        id: 0, // will be overridden in service
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        author: formValue.author || 'Anonyme',
        date: this.today,
        status: 'pending' as const,
        votes: 0,
        nbLikes: 0
      };
      this.suggestionService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }
}
