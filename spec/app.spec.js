process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest");
const { expect } = require("chai");
describe("API", () => {
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
            .then(res => {
              expect(res.body.message).to.equal("Welcome");
            });
        });
      });
    });
  });
});