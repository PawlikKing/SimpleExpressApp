import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const validEmail = 'testuser@budgetapp';
  const validPassword = 'password123';
  const validUsername = 'testuser';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('signUp', () => {
    it('should create a new user with valid data', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);

      expect(user).toBeDefined();
      expect(user.username).toBe(validUsername);
      expect(user.email).toBe(validEmail);
      expect(user.password).toBe(validPassword);
      expect(user.id).toBeDefined();
    });

    it('should set session after sign up', () => {
      service.signUp(validUsername, validEmail, validPassword);
      const currentUser = service.currentUser();

      expect(currentUser).toBeDefined();
      expect(currentUser?.username).toBe(validUsername);
    });

    it('should throw error if email does not end with @budgetapp', () => {
      expect(() => {
        service.signUp(validUsername, 'test@gmail.com', validPassword);
      }).toThrowError('Email must be in @budgetapp domain');
    });

    it('should throw error if user already exists', () => {
      service.signUp(validUsername, validEmail, validPassword);

      expect(() => {
        service.signUp(validUsername, validEmail, 'differentPassword');
      }).toThrowError('User already exists');
    });

    it('should throw error if email is already registered', () => {
      service.signUp(validUsername, validEmail, validPassword);

      expect(() => {
        service.signUp('differentUsername', validEmail, validPassword);
      }).toThrowError('User already exists');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      service.signUp(validUsername, validEmail, validPassword);
      service.clearSession();
    });

    it('should login with valid email and password', () => {
      const user = service.login(validEmail, validPassword);

      expect(user).toBeDefined();
      expect(user.email).toBe(validEmail);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should login with valid username and password', () => {
      const user = service.login(validUsername, validPassword);

      expect(user).toBeDefined();
      expect(user.username).toBe(validUsername);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should throw error with invalid password', () => {
      expect(() => {
        service.login(validEmail, 'wrongPassword');
      }).toThrowError('Invalid credentials');
    });

    it('should throw error with non-existent user', () => {
      expect(() => {
        service.login('nonexistent@budgetapp', validPassword);
      }).toThrowError('Invalid credentials');
    });
  });

  describe('currentUser', () => {
    it('should return null when no session exists', () => {
      expect(service.currentUser()).toBeNull();
    });

    it('should return current user when session exists', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);

      expect(service.currentUser()).toEqual(user);
    });
  });

  describe('setSession and clearSession', () => {
    it('should set session correctly', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);
      service.clearSession();

      service.setSession(user.id);

      expect(service.currentUser()).toEqual(user);
    });

    it('should clear session', () => {
      service.signUp(validUsername, validEmail, validPassword);

      service.clearSession();

      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is logged in', () => {
      service.signUp(validUsername, validEmail, validPassword);

      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false when user is not logged in', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('sendReset', () => {
    beforeEach(() => {
      service.signUp(validUsername, validEmail, validPassword);
      service.clearSession();
    });

    it('should generate reset token for valid email', () => {
      const token = service.sendReset(validEmail);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should throw error for non-existent email', () => {
      expect(() => {
        service.sendReset('nonexistent@budgetapp');
      }).toThrowError('Email not found');
    });
  });

  describe('resetPassword', () => {
    let resetToken: string;

    beforeEach(() => {
      service.signUp(validUsername, validEmail, validPassword);
      service.clearSession();
      resetToken = service.sendReset(validEmail);
    });

    it('should reset password with valid token', () => {
      const newPassword = 'newPassword123';

      service.resetPassword(resetToken, newPassword);
      const user = service.login(validEmail, newPassword);

      expect(user).toBeDefined();
    });

    it('should not login with old password after reset', () => {
      service.resetPassword(resetToken, 'newPassword123');

      expect(() => {
        service.login(validEmail, validPassword);
      }).toThrowError('Invalid credentials');
    });

    it('should throw error with invalid token', () => {
      expect(() => {
        service.resetPassword('invalidToken', 'newPassword123');
      }).toThrowError('Invalid token');
    });
  });

  describe('removeAccount', () => {
    it('should remove user account and clear session', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);

      service.removeAccount(user.id);

      expect(service.isAuthenticated()).toBe(false);
      expect(() => {
        service.login(validEmail, validPassword);
      }).toThrowError('Invalid credentials');
    });
  });

  describe('changeUsername', () => {
    it('should change user username', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);
      const newUsername = 'newUsername';

      service.changeUsername(user.id, newUsername);

      const updatedUser = service.currentUser();
      expect(updatedUser?.username).toBe(newUsername);
    });
  });

  describe('changeEmail', () => {
    it('should change user email to valid domain', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);
      const newEmail = 'newemail@budgetapp';

      service.changeEmail(user.id, newEmail);

      const updatedUser = service.currentUser();
      expect(updatedUser?.email).toBe(newEmail);
    });

    it('should throw error when changing email to invalid domain', () => {
      const user = service.signUp(validUsername, validEmail, validPassword);

      expect(() => {
        service.changeEmail(user.id, 'invalid@gmail.com');
      }).toThrowError('Email must be in @budgetapp domain');
    });
  });
});
