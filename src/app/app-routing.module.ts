import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

// ============================================================
// PARTIE 1 : Routage simple + PARTIE 2 : Lazy Loading
// ============================================================
const routes: Routes = [

  // ── Partie1 : Route par défaut → redirige vers /home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // ── Partie1 : /home → HomeComponent
  {
    path: 'home',
    component: HomeComponent
  },

  // ── Partie2 : /suggestions → module lazy loaded SuggestionsModule
  //    (remplace l'ancienne route statique /listSuggestion)
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./features/suggestions/suggestions.module')
        .then(m => m.SuggestionsModule)
  },

  // ── Partie2 : /users → module lazy loaded UsersModule
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module')
        .then(m => m.UsersModule)
  },

  // ── Partie1 : route wildcard → NotfoundComponent
  {
    path: '**',
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
