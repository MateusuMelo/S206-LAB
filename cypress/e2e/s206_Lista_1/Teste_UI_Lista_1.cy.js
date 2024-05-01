describe('The-Internet-Test', () => {
  it('Add/Remove Elements ', () => {
    cy.visit('http://the-internet.herokuapp.com/add_remove_elements/')
    let iteracoes = new Date().getSeconds()
    cy.get('button').click()

    for (let i = 0; i <= iteracoes; i++) {
      cy.get('[onclick="addElement()"]').click()
    }

    cy.get('#elements').should('be.visible');

    for (let i = 0; i <= iteracoes + 1; i++) {
      cy.get('#elements > :nth-child(1)').click()
    }
    cy.get('#elements').should('not.have.attr', 'button');
  })

  it('Js Alert', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get(':nth-child(1) > button').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`I am a JS Alert`)
    })
    cy.get('#result').should('contain.text', 'You successfully clicked an alert')

  })
  it('Js confirm-prompt confirmed', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get(':nth-child(2) > button').click()
    cy.on('window:confirm', () => true);
    cy.get('#result').should('contain.text', 'You clicked: Ok')

  })
  it('Js confirm-prompt canceled', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get(':nth-child(2) > button').click()
    cy.on('window:confirm', () => false);
    cy.get('#result').should('contain.text', 'You clicked: Cancel')

  })

  it('Js entry-prompt confirmed', () => {
    let stub;
    let data = new Date().getMinutes().toString()
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')

    cy.window().then(win => {
      stub = cy.stub(win, 'prompt').returns(data);
    });
    cy.get(':nth-child(3) > button').click()

    // Verifica se o texto inserido no prompt foi exibido no local desejado
    cy.get('#result').should('contain.text', `You entered: ${data}`)
  })

  it('Js entry-prompt canceled', () => {
    let stub;
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get(':nth-child(3) > button').click()
    cy.window().then(win => {
      stub = cy.stub(win, 'prompt').returns(null);
    });

    cy.get('#result').should('contain.text', 'You entered: null')

  })


})