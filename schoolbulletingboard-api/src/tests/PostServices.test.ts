import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app";

describe("Posts API", () => {

    it("deve listar todos os posts", async () => {
        const response = await request(app)
            .get("/posts");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);      

    });

    it("deve criar um novo post", async () => {            
        const response = await request(app)
            .post("/posts")
            .send({
                title: "Teste",
                content: "Conteúdo do teste",
                author: "Gabriel",
                status: "PUBLISHED"
            });
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe("Teste");
            
    });

    it("deve buscar um post existente", async () => {
        const created = await request(app)
            .post("/posts")
            .send({
                title: "Node",
                content: "Teste",
                author: "Gabriel",
                status: "PUBLISHED"
            });

        const response = await request(app)
            .get(`/posts/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(created.body.id);

    });

    it("deve excluir um post", async () => {        
        const created = await request(app)
            .post("/posts")
            .send({
                title: "Excluir",
                content: "Teste",
                author: "Gabriel",
                status: "PUBLISHED"
            });
        
        const deleted = await request(app)
            .delete(`/posts/${created.body.id}`);
        
        expect(deleted.status).toBe(200);
        
    });
});




