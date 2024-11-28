describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Vite'nin dev server URL'si

  });

  it('Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını açabiliyorum', () => {
    // Geçerli email ve password gir
    cy.get('#exampleEmail').type('test@example.com');
    cy.get('#examplePassword').type('1234');
    cy.get('#terms').check(); // Şartları kabul et
    cy.get('button').should('not.be.disabled'); // Buton aktif
    cy.get('form').submit(); // Formu gönder
    cy.url().should('include', '/main'); // Success sayfasına yönlendirildi mi
  });

  it('Email yanlış girildiğinde hata mesajı görünüyor ve buton disabled durumda', () => {
    // Yanlış email gir
    cy.get('#exampleEmail').type('invalidemail');
    cy.get('#examplePassword').type('1234');
    cy.get('#terms').check();

    // Hata mesajını kontrol et
    cy.get('.invalid-feedback').should('have.length', 1); // 1 hata mesajı var
    cy.contains('Please enter a valid email address'); // Doğru hata mesajı
    cy.get('button').should('be.disabled'); // Buton disabled durumda
  });

  it('Email ve password yanlış girildiğinde beklenen hata mesajları görünüyor', () => {
    // Yanlış email ve password gir
    cy.get('#exampleEmail').type('invalidemail');
    cy.get('#examplePassword').type('12'); // 4 karakterden kısa
    cy.get('#terms').check();

    // Hata mesajlarını kontrol et
    cy.get('.invalid-feedback').should('have.length', 2); // 2 hata mesajı var
    cy.contains('Please enter a valid email address'); // Email hata mesajı
    cy.contains('Password must be at least 4 characters long'); // Password hata mesajı
    cy.get('button').should('be.disabled'); // Buton disabled durumda
  });

  it('Email ve password doğru ama kuralları kabul etmedim, buton disabled durumda', () => {
    // Geçerli email ve password gir ama checkbox seçilmesin
    cy.get('#exampleEmail').type('test@example.com');
    cy.get('#examplePassword').type('1234');

    // Butonun disabled olduğunu kontrol et
    cy.get('button').should('be.disabled'); // Buton aktif değil
  });
});
