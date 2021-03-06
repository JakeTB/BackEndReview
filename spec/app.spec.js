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
  describe("GET: /api", () => {
    describe("Status:200", () => {
      it("Returns with a status of 200", () => {
        return request(app)
          .get("/api")
          .expect(200);
      });
    });
  });
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
    describe("Status: 405", () => {
      it("Recieves a status of 405", () => {
        return request(app)
          .delete("/api")
          .expect(405);
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
          describe("Status: 405", () => {
            it("If passed an invalid method will response with a 405 error", () => {
              return request(app)
                .patch("/api/topics")
                .expect(405)
                .then(({ body }) => {
                  expect(body.message).to.equal("Method not found");
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
                expect(body.user.user.username).to.equal("lurker");
              });
          });
          it("Sends the user to the client in an object with a key of user", () => {
            return request(app)
              .get("/api/users/butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(body.user).to.be.a("Object");
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
                .get("/api/users/not-a-username")
                .expect(404);
            });
          });
          describe("Status: 405", () => {
            it("If passed an invalid method should return with a status of 405", () => {
              return request(app)
                .put("/api/users/butter_bridge")
                .expect(405);
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
                expect(body.article[0]).to.be.a("object");
                expect(body.article[0]).to.contain.keys(
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
                expect(body.article[0].article_id).to.equal(1);
              });
          });
        });
        describe("Errors:", () => {
          describe("Status 404", () => {
            it("If the requested article does not exist, but it is a valid response recieves a 404", () => {
              return request(app)
                .get("/api/articles/1000")
                .expect(404);
            });
            it("Recieves an error message detailing that the article has not been found", () => {
              return request(app)
                .get("/api/articles/200")
                .expect(404)
                .then(({ body }) => {
                  expect(body.message).to.equal(
                    "No article found for article id 200"
                  );
                });
            });
          });
          describe("Status:400", () => {
            it("If sent a bad request, recieves a status code of 400", () => {
              return request(app)
                .get("/api/articles/hello")
                .expect(400);
            });
            it("If sent a bad request, recieves a status code of 400 and a message", () => {
              return request(app)
                .get("/api/articles/hello")
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("Bad Request");
                });
            });
          });
          describe("Status 405", () => {
            it("If sent an invalid method returns with a 405", () => {
              return request(app)
                .put("/api/articles/hello")
                .expect(405);
            });
          });
        });
      });
      describe.only("GET:/api/articles", () => {
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
                expect(body.articles).to.be.an("array");
              });
          });
          it("article objects should have the correct keys", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0]).to.contain.keys(
                  "title",
                  "body",
                  "votes",
                  "author"
                );
              });
          });
          it("The default sort should be'created_at' and the default order should be descending", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].article_id).to.equal(1);
                expect(body.articles).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });

          it("Can accept a sort_by query with a value of any column name", () => {
            return request(app)
              .get("/api/articles?sort_by=author")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.sortedBy("author", {
                  descending: true
                });
              });
          });
          it("Can accept a order by query or either desc or asc", () => {
            return request(app)
              .get("/api/articles?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.sortedBy("created_at", {
                  ascending: true
                });
              });
          });
          it("Accept an author query of any auhtor that exisists in the database", () => {
            return request(app)
              .get("/api/articles?author=butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].author).to.equal("butter_bridge");
                expect(body.articles[1].author).to.equal("butter_bridge");
              });
          });
          it("Accept an topic query of any topic slug that exsists in the database", () => {
            return request(app)
              .get("/api/articles?topic=mitch")
              .expect(200)
              .then(({ body: { articles } }) => {
                expect(articles[0].topic).to.equal("mitch");
                expect(articles[3].topic).to.equal("mitch");
                expect(articles[5].topic).to.equal("mitch");
              });
          });
          it("Tests that the default number of responses served is 10", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body: { articles } }) => {
                expect(articles.length).to.equal(10);
              });
          });
          it.only("Tests that the limit can be set by the query", () => {
            return request(app)
              .get("/api/articles?limit=5")
              .expect(200)
              .then(({ body: { articles } }) => {
                expect(articles.length).to.equal(5);
              });
          });
        });
      });
      describe("PATCH:/articles/;article_Id", () => {
        describe("Status:200", () => {
          it("Recieves a status of of 200", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(200);
          });
          it("Updates the article object and returns the new one", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body }) => {
                expect(body.article[0]).to.be.an("object");
                expect(body.article[0]).to.contain.keys(
                  "title",
                  "body",
                  "votes",
                  "author"
                );
              });
          });
        });
        describe("Errors:", () => {
          describe("404:", () => {
            it("Recieves a status code of 404 if the path is not found", () => {
              return request(app)
                .patch("/api/articlearres/1")
                .send({ inc_votes: 1 })
                .expect(404);
            });
            it("Receices an error message stating that the page is not found", () => {
              return request(app)
                .patch("/api/articlearres/1")
                .send({ inc_votes: 1 })
                .expect(404)
                .then(({ body }) => {
                  expect(body.message).to.equal("Route not found");
                });
            });
            it("Recieces a status of 404 and an error message if the path is good but the resource does not exist", () => {
              return request(app)
                .patch("/api/articles/50")
                .send({ inc_votes: 1 })
                .expect(404)
                .then(({ body }) => {
                  expect(body.message).to.equal(
                    "No article found for article id 50"
                  );
                });
            });
          });
          describe("400:", () => {
            it("Recieves a status code of 400 when sent a bad request", () => {
              return request(app)
                .patch("/api/articles/healasa")
                .send({ inc_votes: 1 })
                .expect(400);
            });
            it("If passed an invalid id, recieves an error message detailing it as a bad request", () => {
              return request(app)
                .patch("/api/articles/healasa")
                .send({ inc_votes: 1 })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("Bad Request");
                });
            });
            it("If passed a malformed body, or a bdy with missing fields returns with a bad request", () => {
              return request(app)
                .patch("/api/articles/1")
                .send({})
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("Malformed or incorrect body");
                });
            });
          });
        });
      });
      describe("POST:/api/articles/:article/comments", () => {
        describe("Status 201:", () => {
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
          it("Inserted comment has the correct body", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "He's a swell guy" })
              .expect(201)
              .then(({ body }) => {
                expect(body.newComment[0].body).to.equal("He's a swell guy");
              });
          });
          it("Inserted comment has the author body", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "He's a swell guy" })
              .expect(201)
              .then(({ body }) => {
                expect(body.newComment[0].author).to.equal("butter_bridge");
              });
          });
        });
        describe("Errors:", () => {
          describe("Status:404", () => {
            it("If sent an incorrect route returns with a status message of 404", () => {
              return request(app)
                .post("/api/articles/1/coments")
                .send({ username: "butter_bridge", body: "He's a swell guy" })
                .expect(404);
            });
            it("If sent a post request for a valid article ID that does not exist", () => {
              return request(app)
                .post("/api/articles/10000/comments")
                .expect(404)
                .send({ username: "butter_bridge", body: "He's a swell guy" });
            });
          });
          describe("Status: 400", () => {
            it("If sent a correct route wth a resource that does not exist returns with a 400", () => {
              return request(app)
                .post("/api/articles/90/comments")
                .send({ username: "butter_bridge", body: "He's a swell guy" })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal(
                    "Bad request, id does not exsist"
                  );
                });
            });
            it("If sent a body missing an author key, returns a 400", () => {
              return request(app)
                .post("/api/articles/2/comments")
                .send({ body: "He's a swell guy" })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("No author");
                });
            });
            it("If sent a body missing an body key, returns a 400", () => {
              return request(app)
                .post("/api/articles/2/comments")
                .send({ username: "butter_bridge" })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("No body");
                });
            });
            it("If sent an empty body object returns with a 400", () => {
              return request(app)
                .post("/api/articles/2/comments")
                .send({})
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("Empty post");
                });
            });
            it("If sent a post from a non-existant user returns with a 400", () => {
              return request(app)
                .post("/api/articles/2/comments")
                .send({ username: "example2", body: "He's a swell guy" })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal(
                    "Bad request, id does not exsist"
                  );
                });
            });
          });
        });
      });
      describe("GET: articles/article:id/comments", () => {
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
                expect(body.comments[0]).to.contain.keys(
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
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "author",
                  "votes"
                );
              });
          });
          it("The default sort order of the comments is created_at, in descendning order", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("Can accept a order by query that sorts the comments by any valid comments, and defaults the order to descending", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("votes", {
                  descending: true
                });
              });
          });
          it("Accepts an order query of asc ", () => {
            return request(app)
              .get("/api/articles/1/comments?order=desc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("Accepts an order query of asc ", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  ascending: true
                });
              });
          });
          it("When the article exists but has no comments returns an empty array", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.eql([]);
              });
          });
        });
        describe("Errors", () => {
          describe("Status:404", () => {});
          describe("Status: 405", () => {
            it("When passed an invalid method, returns with a 405", () => {
              return request(app)
                .put("/api/articles/1/comments")
                .expect(405);
            });
          });
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
              expect(body.comment.comment_id).to.equal(1);
            });
        });
        it("Should increase the vote count but the passed property", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 2 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(18);
            });
        });
        it("Should decrease the vote count but the passed property", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: -2 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(14);
            });
        });
        it("When sent a body with no inc_votes property should send back an unchaged comment", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ hello: 0 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(16);
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
          it("Requested resource does not exist", () => {
            return request(app)
              .patch("/api/comments/1000")
              .expect(404);
          });
          it("Request an article that does not exist with a correct body", () => {
            return request(app)
              .patch("/api/comments/1000")
              .expect(404)
              .send({ inc_votes: 2 });
          });
        });
        describe("Status:400", () => {
          it("Should recieve a status code of 400", () => {
            return request(app)
              .patch("/api/comments/jack")
              .expect(400);
          });
        });
        describe("Status 405:", () => {
          it("If passed an invalid method should return with the status code 405", () => {
            return request(app)
              .put("/api/comments/1")
              .expect(405);
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
          it("Recieves a 404 error when delete contains a vaid comment_id that does not exist", () => {
            return request(app)
              .delete("/api/comments/1000")
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
