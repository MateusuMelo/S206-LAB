describe('Prova 2 testes', () => {
  const user = createUser();
  it('SingUp_sucess', () => {
    cy.visit('https://www.demoblaze.com/index.html');
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user[0].toString());
    cy.get('#sign-password').type(user[1].toString());
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
  })
  it('Login_sucess', ()=>{
    cy.visit('https://www.demoblaze.com/index.html');
    cy.get('#login2').click();
    cy.get('#loginusername').type(user[0].toString());
    cy.get('#loginpassword').type(user[1].toString());
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    //cy.get('#nameofuser').contains(user[0].toString()); // EM Teoria essea linha de comomando verificaria se o usuario esta logado, porem por alguma coisa quando eu coloco esta linha o usuaro "nao existe", mas em essa linha o usuario EXISTE
  })
  it('Add_to_cart_sucess', ()=>{
    cy.visit('https://www.demoblaze.com/index.html');
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click();
    cy.get('.col-sm-12 > .btn').click;
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Product added.`);
    });
  })
  it('Place_Order_falha', ()=>{
    cy.visit('https://www.demoblaze.com/cart.html');
    cy.get('.col-lg-1 > .btn').click();
    cy.get('#name').type(user[0]);
    cy.get('#country').type(randomString());
    cy.get('#city').type(randomString());
    cy.get('#month').type(randomString());
    cy.get('#year').type(randomString());
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please fill out Name and Creditcard.`);
    });
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click();
    cy.get('.col-lg-1 > .btn').click();
    cy.get('#country').type(randomString());
    cy.get('#city').type(randomString());
    cy.get('#month').type(randomString());
    cy.get('#year').type(randomString());
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please fill out Name and Creditcard.`);
    });
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click();
    cy.get('.col-lg-1 > .btn').click();
    cy.get('#country').type(randomString());
    cy.get('#city').type(randomString());
    cy.get('#month').type(randomString());
    cy.get('#year').type(randomString());
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please fill out Name and Creditcard.`);
    });
  });

});

function createUser(){
  let hora = new Date().getHours().toString();
  let min = new Date().getMinutes().toString();
  let seg = new Date().getSeconds().toString();
  let ID = hora+min+seg+"ID";
  let Senha = hora + min + seg + "Senha";
  let infos = [ID,Senha];

  return infos;
}

function randomString(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function verfyAlertWindow(message){
  cy.on('window:alert', (str) => {
    expect(str).to.equal(message)
  });

}