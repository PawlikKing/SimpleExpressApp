import { Injectable } from '@angular/core';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'budgetapp_users';
  private readonly tokenKey = 'budgetapp_session';

  private loadUsers(): User[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  signUp(username: string, email: string, password: string) {
    if (!email.endsWith('@budgetapp')) {
      throw new Error('Email must be in @budgetapp domain');
    }
    const users = this.loadUsers();
    if (users.find((u) => u.email === email || u.username === username)) {
      throw new Error('User already exists');
    }
    const user: User = { id: Date.now().toString(), username, email, password };
    users.push(user);
    this.saveUsers(users);
    this.setSession(user.id);
    return user;
  }

  login(identifier: string, password: string) {
    const users = this.loadUsers();
    const user = users.find(
      (u) => (u.email === identifier || u.username === identifier) && u.password === password,
    );
    if (!user) throw new Error('Invalid credentials');
    this.setSession(user.id);
    return user;
  }

  sendReset(email: string) {
    const users = this.loadUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error('Email not found');
    const token = Math.random().toString(36).slice(2);
    const mapRaw = localStorage.getItem('budgetapp_reset') || '{}';
    const map = JSON.parse(mapRaw);
    map[token] = user.id;
    localStorage.setItem('budgetapp_reset', JSON.stringify(map));
    return token;
  }

  resetPassword(token: string, newPassword: string) {
    const mapRaw = localStorage.getItem('budgetapp_reset') || '{}';
    const map = JSON.parse(mapRaw);
    const userId = map[token];
    if (!userId) throw new Error('Invalid token');
    const users = this.loadUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');
    user.password = newPassword;
    this.saveUsers(users);
    delete map[token];
    localStorage.setItem('budgetapp_reset', JSON.stringify(map));
    return true;
  }

  currentUser() {
    const id = localStorage.getItem(this.tokenKey);
    if (!id) return null;
    return this.loadUsers().find((u) => u.id === id) || null;
  }

  setSession(id: string) {
    localStorage.setItem(this.tokenKey, id);
  }

  clearSession() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  removeAccount(id: string) {
    const users = this.loadUsers().filter((u) => u.id !== id);
    this.saveUsers(users);
    this.clearSession();
  }

  changeUsername(id: string, username: string) {
    const users = this.loadUsers();
    const user = users.find((u) => u.id === id);
    if (user) {
      user.username = username;
      this.saveUsers(users);
    }
  }

  changeEmail(id: string, email: string) {
    if (!email.endsWith('@budgetapp')) throw new Error('Email must be in @budgetapp domain');
    const users = this.loadUsers();
    const user = users.find((u) => u.id === id);
    if (user) {
      user.email = email;
      this.saveUsers(users);
    }
  }
}
