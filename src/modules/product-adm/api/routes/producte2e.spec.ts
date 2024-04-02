import { Sequelize } from "sequelize-typescript"
import { app } from "../../../../express"
import request from "supertest"
import { Umzug } from "umzug"

import { migrator } from "../../../../migrations/config-migrations/migrator"
import { ProductModel } from "../../repository/product.model"
import ProductCatalogModel from "../../../store-catalog/repository/product.model"

describe("E2E test for product", () => {
    let sequelize: Sequelize
  
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
      })
      
      sequelize.addModels([ProductModel, ProductCatalogModel])
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
