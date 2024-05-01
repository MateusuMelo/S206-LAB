///<reference = cypress>

describe('Teste de Registro e login', () => {
  it('teste registro usuario com sucesso', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('FName')
    cy.get('#Text1').type('Lname')
    cy.get('#username').type('Uname')
    cy.get('#password').type('password')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")
  })

  it('teste registro usuario com falha', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('FName')
    cy.get('#Text1').type('Lname')
    cy.get('#username').type('Uname')
    cy.get('.btn-primary').should("be.disabled")
  })

  it('teste de login com sucesso',()=>{
    let infos = createUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', infos[0])

  })

  it('teste delete', () =>{
    let infos = createUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', infos[0])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text','Username or password is incorrect' )

  })

})

function createUser(){
  let hora = new Date().getHours().toString()
  let min = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let ID = hora+min+seg+"ID"
  let Senha = hora + min + seg + "Senha"
  let infos = [ID,Senha]

cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
cy.get('.btn-link').click()
cy.get('#firstName').type(ID)
cy.get('#Text1').type(min)
cy.get('#username').type(ID)
cy.get('#password').type(Senha)
cy.get('.btn-primary').click()
return infos
}