import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';

describe('App', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar with BudgetApp title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    expect(toolbar?.textContent).toContain('BudgetApp');
  });

  it('should navigate to home when clicking BudgetApp title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const titleSpan = fixture.nativeElement.querySelector('span[style*="cursor:pointer"]');
    titleSpan.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should have navigation buttons for everyone and my products', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-icon-button]');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('should navigate to everyone products page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-icon-button]');
    buttons[0].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/everyone');
  });

  it('should navigate to my products page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-icon-button]');
    buttons[1].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/my');
  });

  it('should have login and register buttons', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-button]');
    const buttonTexts = Array.from(buttons).map((b: any) => b.textContent);

    expect(buttonTexts).toContain('Login');
    expect(buttonTexts).toContain('Register');
  });

  it('should navigate to login page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-button]');
    buttons[0].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should navigate to register page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-button]');
    buttons[1].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/register');
  });

  it('should show loading spinner initially', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const loader = fixture.nativeElement.querySelector('.app-loader');
    expect(loader).toBeTruthy();
  });

  it('should hide loading spinner after 1300ms', (done) => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const loader = fixture.nativeElement.querySelector('.app-loader');
      expect(loader).toBeFalsy();
      done();
    }, 1400);
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});
