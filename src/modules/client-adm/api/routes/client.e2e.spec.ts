import { app, sequelize } from "../../../../express"
import request from "supertest"

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "Test name",
                email: "test@test.com",
                document: "test document",
                address: {
                    street: "test street",
                    number: "test number",
                    complement: "test complement",
                    city: "test city",
                    state: "test state",
                    zipCode: "test zip code"
                }
            });

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("Test name")
        expect(response.body.email).toBe("test@test.com")
        expect(response.body.document).toBe("test document")
        expect(response.body.address).toBeDefined()
    });
});
