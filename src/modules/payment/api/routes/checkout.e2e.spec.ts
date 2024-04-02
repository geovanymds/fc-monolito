import { Sequelize } from "sequelize-typescript"
import { app } from "../../../../express"
import { Umzug } from "umzug"
import { migrator } from "../../../../migrations/config-migrations/migrator"
import request from "supertest"

import TransactionModel from "../../repository/transaction.model"

describe("E2E test for checkout", () => {
    let sequelize: Sequelize
  
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
      })
      
      sequelize.addModels([TransactionModel])
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

    it("Should realize the checkout", async () => {
        const payload = {
            orderId: "order_id_test",
            amount: 100
        }

        const response = await request(app)
            .post("/checkout")
            .send(payload);

        expect(response.status).toBe(200);
        expect(response.body.transactionId).toBeDefined();
        expect(response.body.orderId).toEqual(payload.orderId);
        expect(response.body.amount).toEqual(payload.amount);
        expect(response.body.status).toEqual("approved");
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.updatedAt).toBeDefined();
    });

    it("Should throw exception 'Amount must be greater than 0'", async () => {
        const response = await request(app)
            .post("/checkout")
            .send({
                orderId: "order_id_test",
                amount: -100
            });

        expect(response.status).toBe(500);
    });
});
