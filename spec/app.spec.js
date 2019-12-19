process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const knex = require("../db/connection");
beforeEach(() => {
  return knex.seed.run();
});
after(() => {
  return knex.destroy();
});
describe("API", () => {
  describe("API-errors:", () => {
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
      describe("GET:/api/topics", () => {
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
        describe("GET: /api/topics-errors", () => {
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
    });
    describe("/api/users", () => {
      describe("GET:/api/users/:username", () => {
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
        describe("GET:/api/users/:username - Errors", () => {
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
    });
    describe("/api/articles", () => {
      describe("GET:/api/articles/:articleid", () => {
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
          describe("GET:/api/articles", () => {
            describe("Status:200", () => {
              it("Recieves a status of 200", () => {
                return request(app)
                  .get("/api/articles")
                  .expect(200);
              });
              it("Should respond with an array of article objects", () => {
                return request(app)
                  .get("/api/articles")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.articleArray).to.be.an("array");
                  });
              });
              it("article objects should have the correct keys", () => {
                return request(app)
                  .get("/api/articles")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.articleArray[0]).to.contain.keys(
                      "title",
                      "body",
                      "votes",
                      "author"
                    );
                  });
              });
            });
          });
        });

        describe.only("GET: articles/article:id/comments", () => {
          describe("Status: 200", () => {
            it("Recieve a status of 200", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200);
            });
            it("Should recieve an array of comments from the given article", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body.commentsArray[0]).to.contain.keys(
                    "comment_id",
                    "author",
                    "votes"
                  );
                });
            });
            it("Should recieve an array of comments from the given article with the correct keys", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body.commentsArray[0]).to.contain.keys(
                    "comment_id",
                    "author",
                    "votes"
                  );
                });
            });
            it("The default sort order of the comments is created_at, in descedning order", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body.commentsArray).to.be.sortedBy("created_at", {
                    descending: true
                  });
                });
            });
            it("Can accept a order by query that sorts the comments by any valid comments, and defaults the order to descending", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=votes")
                .expect(200)
                .then(({ body }) => {
                  expect(body.commentsArray).to.be.sortedBy("votes", {
                    descending: true
                  });
                });
            });
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
      it("Inserts a new comment into the comments table, and returns the posted comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge", body: "He's a swell guy" })
          .expect(201)
          .then(({ body }) => {
            expect(body.newComment[0]).to.contain.keys(
              "author",
              "comment_id",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
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
  describe("/api/comments", () => {
    describe("PATCH:/api/comments/:comment_id", () => {
      describe("Status:200", () => {
        it("Recieves a status of 200", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 2 })
            .expect(200);
        });
        it("The updated comment should have the same comment id", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 2 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment[0].comment_id).to.equal(1);
            });
        });
        it("Should increase the vote count but the passed property", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 2 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment[0].votes).to.equal(18);
            });
        });
        it("Should decrease the vote count but the passed property", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: -2 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment[0].votes).to.equal(14);
            });
        });
      });
      describe("Errors", () => {
        describe("Status:404", () => {
          it("Recieve a status code of 404", () => {
            return request(app)
              .patch("/api/coments/1")
              .expect(404);
          });
          xit("Requested resource does not exist", () => {
            return request(app)
              .patch("/api/comments/1000")
              .expect(404);
          });
        });
        describe("Status:400", () => {
          it("Should recieve a status code of 400", () => {
            return request(app)
              .patch("/api/comments/jack")
              .expect(400);
          });
        });
      });
    });
    describe("DELETE:/api/comments/:comment_id", () => {
      describe("Status:204", () => {
        it("Recieves a status code of 204", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204);
        });
      });
      describe("Errors", () => {
        describe("Status 404", () => {
          it("Recieves a status code of 404", () => {
            return request(app)
              .delete("/api/commmments/1")
              .expect(404);
          });
        });
        describe("Status 400", () => {
          it("Recieve a status of 400 if given a bad request", () => {
            return request(app)
              .delete("/api/comments/hello")
              .expect(400);
          });
          it("Should send a message detaling a bad request", () => {
            return request(app)
              .delete("/api/comments/hello")
              .expect(400)
              .then(({ body }) => {
                expect(body.message).to.equal("Bad Request");
              });
          });
        });
      });
    });
  });
});
