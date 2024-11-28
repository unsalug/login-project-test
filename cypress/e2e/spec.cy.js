describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Email yanlış girildiğinde hata mesajı görünüyor ve buton disabled durumda', () => {
    cy.get('#exampleEmail').type('invalidEmail');
    cy.get('#examplePassword').type('1234'); 
    cy.get('#terms').check();
    
    cy.get('.invalid-feedback').should('have.length', 1); 
    cy.contains('Please enter a valid email address'); 
    cy.get('button').should('be.disabled'); 
  });

  it('Email ve password yanlış girildiğinde iki hata mesajı görünüyor ve buton disabled durumda', () => {
    cy.get('#exampleEmail').type('invalidEmail');
    cy.get('#examplePassword').type('12'); 
    cy.get('#terms').check();

    cy.get('.invalid-feedback').should('have.length', 2); 
    cy.contains('Please enter a valid email address'); 
    cy.contains('Password must be at least 4 characters long'); 
    cy.get('button').should('be.disabled'); 
  });

  it('Email ve password doğru ama kuralları kabul etmedim, buton disabled durumda', () => {
    cy.get('#exampleEmail').type('erdem.guntay@wit.com.tr');
    cy.get('#examplePassword').type('9fxIH0GXesEwH_I');
    
    
    cy.get('button').should('be.disabled');
  });

  it('Başarılı login, buton aktif ve main sayfasına yönlendirme', () => {
    cy.get('#exampleEmail').type('erdem.guntay@wit.com.tr');
    cy.get('#examplePassword').type('9fxIH0GXesEwH_I');
    cy.get('#terms').check();
    
    cy.get('button').should('not.be.disabled');
    cy.get('form').submit(); 
    cy.url().should('include', '/main'); 
  });
});
