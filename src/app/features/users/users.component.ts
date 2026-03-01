import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Alice Martin',    role: 'Admin',     email: 'alice@example.com',   suggestions: 12, joined: '2024-06-01' },
    { id: 2, name: 'Bob Dupont',      role: 'Member',    email: 'bob@example.com',     suggestions: 5,  joined: '2024-08-15' },
    { id: 3, name: 'Clara Benali',    role: 'Member',    email: 'clara@example.com',   suggestions: 7,  joined: '2024-09-03' },
    { id: 4, name: 'David Chen',      role: 'Moderator', email: 'david@example.com',   suggestions: 3,  joined: '2024-07-20' },
    { id: 5, name: 'Emma Rousseau',   role: 'Member',    email: 'emma@example.com',    suggestions: 9,  joined: '2025-01-10' },
    { id: 6, name: 'François Lambert', role: 'Member',   email: 'francois@example.com',suggestions: 2,  joined: '2025-02-01' }
  ];
}
