describe("Form test", () => {
    it("Can fill the form", () => {
      cy.visit("http://localhost:3000/pizza");
      cy.get("form");
  
      cy.get('input[name="name"]').type("Paul Menard");

      cy.server();
      cy.route({
        url: "https://reqres.in/api/users",
        method: "POST",
        response: { statusText: "Created", code: 201 }
        
      });
  
      cy.get("form").submit();
  
      
    });
  });