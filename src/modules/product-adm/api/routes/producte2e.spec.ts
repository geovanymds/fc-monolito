import { app, sequelize } from "../../../../express"
import request from "supertest"

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Book test",
                description: "Test book",
                purchasePrice: 10.5,
                stock: 100
            });

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Book test")
        expect(response.body.purchasePrice).toBe(10.5)
        expect(response.body.stock).toBe(100)
    });
});
