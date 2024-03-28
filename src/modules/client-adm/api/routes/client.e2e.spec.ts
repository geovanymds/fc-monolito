import { app, sequelize } from "../../../../express"
import request from "supertest"
import Address from "../../../@shared/domain/value-object/address";

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
                address: new Address(
                    "test street",
                    "test number",
                    "test complement",
                    "test city",
                    "test state",
                    "test zip code"
                )
            });

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("Test name")
        expect(response.body.email).toBe("test@test.com")
        expect(response.body.document).toBe("test document")
        expect(response.body.address).toBeDefined()
    });
});
