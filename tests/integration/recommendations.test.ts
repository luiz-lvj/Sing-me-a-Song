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

describe("POST /recommendations/:id/upvote",() =>{
  it("returns 400 for bad request", async () =>{
    const recommendation = await supertest(app).post("/recommendations/anything/upvote").send();
    expect(recommendation.status).toBe(400);
  });
  it("returns 404 for unauthorized access", async () =>{
    const recommendation = await supertest(app).post("/recommendations/0/upvote").send();
    expect(recommendation.status).toBe(404);
  });
  it("returns 201 for valid upvote", async () =>{
    const createRecommendation = await connection.query(`INSERT INTO recommendations(
    name, "youtubeLink", score) VALUES($1, $2, $3) RETURNING *` , ['aa', 'bb', 0]);
    const recommendationId:number = createRecommendation.rows[0].id;
    const recommendationUpvote = await supertest(app).post(`/recommendations/${recommendationId}/upvote`).send();
    expect(recommendationUpvote.status).toBe(201);
  });
})

beforeEach(async () =>{
    await connection.query("DELETE FROM recommendations");
});
afterAll(async () =>{
    await connection.query("DELETE FROM recommendations");
    await connection.end();
});