import { Sequelize } from "sequelize-typescript"
import { app } from "../../../../express"
import { Umzug } from "umzug"
import { migrator } from "../../../../migrations/config-migrations/migrator"
import request from "supertest"

import { ClientModel } from "../../repository/client.model"

describe("E2E test for client", () => {
    let sequelize: Sequelize
  
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
      })
      
      sequelize.addModels([ClientModel])
      migration = migrator(sequelize)
      await migration.up()
    })
  
    afterEach(async () => {
      if (!migration || !sequelize) {
        return 
      }
      migration = migrator(sequelize)
      await migration.down()
      await sequelize.close()
    })

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
