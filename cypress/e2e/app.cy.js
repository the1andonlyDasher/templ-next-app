describe("Navigation with Cookie Consent", () => {
  beforeEach(() => {
    // Visit the index page before each test case
    cy.visit("http://localhost:3000/");
  });

  it("should accept cookies and navigate to the login page", () => {
    // Accept cookies
    cy.get('button[aria-label="Accept cookies"]').click();

    // Ensure the cookie banner is no longer visible
    cy.get('button[aria-label="Accept cookies"]').should("not.be.visible");

    // Find a link with an href attribute containing "login" and click it
    cy.get('a[href*="login"]').click();

    // The new URL should include "/login"
    cy.url().should("include", "/login");

    // The new page should contain an h1 with "Login"
    cy.get("h1").contains("Login");
  });

  it("should decline cookies and navigate to the login page", () => {
    // Decline cookies
    cy.get('button[aria-label="Decline cookies"]').click();

    // Ensure the cookie banner is no longer visible
    cy.get('button[aria-label="Decline cookies"]').should("not.be.visible");

    // Find a link with an href attribute containing "login" and click it
    cy.get('a[href*="login"]').click();

    // The new URL should include "/login"
    cy.url().should("include", "/login");

    // The new page should contain an h1 with "Login"
    cy.get("h1").contains("Login");
  });
});
