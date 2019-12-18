process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const knex = require("../db/connection");
beforeEach(() => {
  return knex.seed.run();
});
after(() => {
  return knex.destroy();
});
describe("API", () => {
  describe("Errors:", () => {
    describe("Status: 404", () => {
      it("Recieves a status of 404", () => {
        return request(app)
          .get("/api/tpics")
          .expect(404);
      });
      it("Recieves an error message", () => {
        return request(app)
          .get("/api/tpics")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.equal("Route not found");
          });
      });
    });
  });
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET:", () => {
        it("Status:200", () => {
          return request(app)
            .get("/api/topics")
            .expect(200);
        });
        it("Status:200. Sends a response message", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.be.a("array");
            });
        });
      });
      describe("Errors", () => {
        describe("Status: 404", () => {
          it("Recieves a status of 404", () => {
            return request(app)
              .get("/api/tpics")
              .expect(404);
          });
          it("Recieves an error message", () => {
            return request(app)
              .get("/api/tpics")
              .expect(404)
              .then(({ body }) => {
                expect(body.message).to.equal("Route not found");
              });
          });
        });
      });
    });
    describe("/users", () => {
      describe("GET:", () => {
        describe("Status:200", () => {
          it("Recieves a status of 200", () => {
            return request(app)
              .get("/api/users/lurker")
              .expect(200);
          });
          it("Status 200: Recieves a user object with the correct properties", () => {
            return request(app)
              .get("/api/users/lurker")
              .expect(200)
              .then(({ body }) => {
                expect(body.userInfo[0]).to.have.keys(
                  "username",
                  "name",
                  "avatar_url"
                );
                expect(body.userInfo[0].username).to.equal("lurker");
              });
          });
        });
      });
      describe("Errors", () => {
        describe("Status: 404", () => {
          it("Recieves a status of 404", () => {
            return request(app)
              .get("/api/usr")
              .expect(404);
          });
          it("Recieves an error message", () => {
            return request(app)
              .get("/api/usr")
              .expect(404)
              .then(({ body }) => {
                expect(body.message).to.equal("Route not found");
              });
          });
          it("Sends 404 because user does not exist", () => {
            return request(app)
              .get("/api/user/turtlesmurtle")
              .expect(404);
          });
        });
      });
    });
    describe("/articles", () => {
      describe("GET:", () => {
        describe("Status:200", () => {
          it("Recieves a status of 200", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200);
          });
          it("Recieves an article object with the correct properties", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.articleObject[0]).to.be.a("object");
                expect(body.articleObject[0]).to.contain.keys(
                  "title",
                  "body",
                  "votes",
                  "author"
                );
              });
          });
          it("Recieves an object with the correct article_id value", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.articleObject[0].article_id).to.equal(1);
              });
          });
        });
      });
      describe("PATCH", () => {
        describe("Status:200", () => {
          it("Recieves a status of of 201", () => {
            return request(app)
              .patch("/api/articles/1")
              .expect(201);
          });
          it("Updates the article object and returns the new one", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(201)
              .then(({ body }) => {
                expect(body.updatedArticle[0]).to.be.an("object");
                expect(body.updatedArticle[0]).to.contain.keys(
                  "title",
                  "body",
                  "votes",
                  "author"
                );
              });
          });
        });
      });
      describe("POST", () => {
        it("Recieves a status of of 201", () => {
          return request(app)
            .post("/api/articles/1")
            .expect(201);
        });
      });
    });
    describe("Errors", () => {
      describe("Status: 404", () => {
        it("Recieves a status of 404", () => {
          return request(app)
            .get("/api/artcle")
            .expect(404);
        });
        it("Recieves an error message", () => {
          return request(app)
            .get("/api/arcle")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.equal("Route not found");
            });
        });
      });
      describe("Status:400", () => {
        it("Recieves a status of 400", () => {
          return request(app)
            .get("/api/articles/hello")
            .expect(400);
        });
        it("Recieves a message which states that its a bad request", () => {
          return request(app)
            .get("/api/articles/hello")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.equal("Bad Request");
            });
        });
      });
    });
  });
});
