# Workshop n°3 — Routage & Lazy Loading · Solution complète

> Solution Angular pour l'implémentation d'un système de navigation (Partie 1 : Routage simple + Partie 2 : Lazy Loading).

---

## 📁 Structure du projet

```
src/app/
├── app.component.ts/html/scss      ← Composant racine avec <router-outlet>
├── app.module.ts                   ← Module principal (eager load)
├── app-routing.module.ts           ← Routes principales + lazy loading
│
├── core/
│   ├── header/                     ← HeaderComponent (RouterLink + RouterLinkActive)
│   ├── home/                       ← HomeComponent   (Partie 1)
│   └── notfound/                   ← NotfoundComponent ** wildcard (Partie 1)
│
├── features/
│   ├── suggestions/                ← Module lazy loaded (/suggestions)
│   │   ├── suggestions.module.ts
│   │   ├── suggestions-routing.module.ts  ← Routes internes (Partie 2)
│   │   ├── suggestions.component.ts       ← Racine avec <router-outlet>
│   │   ├── suggestion-list/               ← SuggestionListComponent
│   │   └── suggestion-details/            ← SuggestionDetailsComponent
│   │
│   └── users/                      ← Module lazy loaded (/users)
│       ├── users.module.ts
│       ├── users-routing.module.ts
│       └── users.component.ts
│
└── shared/
    ├── models/suggestion.model.ts
    └── services/suggestion.service.ts
```

---

## 🚀 Intégration dans votre projet (Workshop2)

### Étape 1 — Copier les fichiers

Copiez tous les fichiers de cette solution dans votre projet Angular existant en respectant l'arborescence ci-dessus.

---

### Étape 2 — Générer les modules lazily (si pas déjà fait)

```bash
ng g module features/suggestions --route suggestions --module app.module
ng g module features/users --route users --module app.module
```

> **Note :** Si vous utilisez les fichiers de cette solution directement, cette étape est déjà faite.

---

### Étape 3 — Générer les composants core (Partie 1)

```bash
ng g c core/home --skip-tests
ng g c core/notfound --skip-tests
```

---

### Étape 4 — Générer SuggestionDetails (Partie 2)

```bash
ng g c features/suggestions/suggestion-details --skip-tests
```

---

### Étape 5 — Vérifier app.module.ts

```typescript
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotfoundComponent
    // ⚠️ SuggestionsModule et UsersModule sont lazy → NE PAS les importer ici
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
```

---

## 📖 Explication des concepts clés

### Partie 1 — Routage simple (`app-routing.module.ts`)

```typescript
const routes: Routes = [
  { path: '',            redirectTo: '/home', pathMatch: 'full' }, // Route par défaut
  { path: 'home',        component: HomeComponent },               // /home
  { path: '**',          component: NotfoundComponent }            // Wildcard 404
];
```

### Partie 2 — Lazy Loading

```typescript
// Dans app-routing.module.ts
{
  path: 'suggestions',
  loadChildren: () =>
    import('./features/suggestions/suggestions.module')
      .then(m => m.SuggestionsModule)
}
```

Le module **SuggestionsModule** n'est chargé que quand l'utilisateur navigue vers `/suggestions` → optimisation du bundle initial.

### Routage interne du module Suggestions (`suggestions-routing.module.ts`)

```typescript
const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,  // Contient <router-outlet>
    children: [
      { path: '',    component: SuggestionListComponent },    // /suggestions
      { path: ':id', component: SuggestionDetailsComponent }  // /suggestions/3
    ]
  }
];
```

### RouterLink dans HeaderComponent

```html
<!-- Partie 1 — Étape 5 -->
<a routerLink="/home"        routerLinkActive="active">Home</a>
<a routerLink="/suggestions" routerLinkActive="active">Suggestions</a>
```

### ActivatedRoute dans SuggestionDetails (Partie 2 — Section 3b)

```typescript
constructor(private activatedRoute: ActivatedRoute) {}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    const id = +params['id'];  // + convertit string → number
    this.suggestion = this.suggestionService.getById(id);
  });
}
```

### Navigation impérative avec Router (bouton Details — Partie 2 — Section 3a)

```typescript
// Dans SuggestionListComponent
viewDetails(id: number): void {
  this.router.navigate(['/suggestions', id]);
}
```

```html
<!-- Template -->
<button (click)="viewDetails(suggestion.id)">Détails →</button>
```

---

## 🎨 Lancer l'application

```bash
cd your-project
npm install
ng serve
```

Puis ouvrir : [http://localhost:4200](http://localhost:4200)

| Route | Composant chargé |
|-------|-----------------|
| `/` | Redirige → `/home` |
| `/home` | `HomeComponent` |
| `/suggestions` | `SuggestionListComponent` (lazy) |
| `/suggestions/1` | `SuggestionDetailsComponent` (lazy, paramétré) |
| `/users` | `UsersComponent` (lazy) |
| `/xyz` | `NotfoundComponent` |

---

## ✅ Checklist du workshop

- [x] **Partie 1.2** — `HomeComponent` créé dans `core/home`
- [x] **Partie 1.3** — `NotfoundComponent` créé dans `core/notfound`
- [x] **Partie 1.4** — Routes dans `app-routing.module.ts` (default, /home, /listSuggestion, **)
- [x] **Partie 1.5** — `HeaderComponent` avec `routerLink` Home et Suggestions
- [x] **Partie 2.1** — Modules `suggestions` et `users` avec lazy loading
- [x] **Partie 2.2a** — `SuggestionListComponent` placé sous `features/suggestions`
- [x] **Partie 2.2b** — `SuggestionDetailsComponent` créé dans `features/suggestions`
- [x] **Partie 2 Routage 2a** — Routes internes dans `suggestions-routing.module.ts`
- [x] **Partie 2 Routage 2b** — `<router-outlet>` dans `SuggestionsComponent`
- [x] **Partie 2.3a** — Bouton "Détails" dans `SuggestionListComponent`
- [x] **Partie 2.3b** — `ActivatedRoute` pour récupérer l'id + affichage des détails + lien "back to list"
