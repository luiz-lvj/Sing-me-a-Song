import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

describe("POST /recommendations", () => {
  it("returns 400 for wrong body", async () =>{
    const body: object = {
        youtubeLink: 'anything'
    }
    const recommendation = await supertest(app).post("/recommendations").send(body);
    expect(recommendation.status).toBe(400);
  });
  it("returns 400 for invalid youtube link", async () =>{
    const body: object = {
        name: "valid name",
        youtubeLink: 'anything'
    }
    const recommendation = await supertest(app).post("/recommendations").send(body);
    expect(recommendation.status).toBe(400);
  });
  it("returns 201 for valid recommendation", async () =>{
      const body: object = {
          name: "valid name",
          youtubeLink: "https://www.youtube.com/watch?v=pKO9UjSeLew"
      }
      const recommendation = await supertest(app).post("/recommendations").send(body);
      expect(recommendation.status).toBe(201);
  })
});
beforeEach(async () =>{
    await connection.query("DELETE FROM recommendations");
});
afterAll(async () =>{
    await connection.query("DELETE FROM recommendations");
    await connection.end();
});