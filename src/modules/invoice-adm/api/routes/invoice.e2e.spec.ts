import { Sequelize } from "sequelize-typescript"
import { app } from "../../../../express"
import { Umzug } from "umzug"
import { migrator } from "../../../../migrations/config-migrations/migrator"
import request from "supertest"

import InvoiceModel from "../../repository/invoice.model"
import InvoiceItemModel from "../../repository/invoice-item.model"


describe("E2E test for invoice", () => {
    let sequelize: Sequelize
  
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
      })
      
      sequelize.addModels([InvoiceModel, InvoiceItemModel])
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

    it("Should retrieve an invoice", async () => {

        const invoiceItems = [
            {
                name: "item test 1",
                price: 15
            },
            {
                name: "item test 2",
                price: 20
            }
        ]

        const billingAddress = {
            street: "street test", 
            number: "number test", 
            complement: "complement test", 
            city: "city test", 
            state: "state", 
            zipCode: "zip code test"
        }

        const payload = {
            name: "invoice test",
            document: "document test",
            address: billingAddress,
            items: invoiceItems
        }

        const responseGenerateInvoice = await request(app)
            .post(`/invoice`)
            .send(payload);

        console.log(responseGenerateInvoice.body)

        const responseGetInvoice = await request(app)
            .get(`/invoice/${responseGenerateInvoice.body.id}`)
            .send(payload);

        expect(responseGetInvoice.status).toBe(200);
        expect(responseGetInvoice.body.id).toBeDefined();
        expect(responseGetInvoice.body.document).toEqual(payload.document);
        expect(responseGetInvoice.body.address).toEqual(payload.address);
        expect(responseGetInvoice.body.items.length).toEqual(2);
        expect(responseGetInvoice.body.address).toEqual(billingAddress);
        expect(responseGetInvoice.body.createdAt).toBeDefined();
        expect(responseGetInvoice.body.updatedAt).toBeDefined();
    });
});
