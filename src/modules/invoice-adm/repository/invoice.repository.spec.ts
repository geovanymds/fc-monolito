import { Sequelize } from "sequelize-typescript";

import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice-item";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import Address from "../../@shared/domain/value-object/address";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save an invoice", async () => {
    const invoiceItems = [
        new InvoiceItem({
            id: new Id("1"),
            name: "item 1",
            price: 10.0
        }),
        new InvoiceItem({
            id: new Id("2"),
            name: "item 2",
            price: 15.0
        }),
    ];

    const invoice = new Invoice({
        id: new Id("1"),
        name: "test invoice",
        document: "document test",
        address: new Address(
            "any street",
            "5",
            "test complement",
            "test city",
            "test state",
            "test zip code"
        ),
        items: invoiceItems,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const repository = new InvoiceRepository();
    await repository.add(invoice);

    const result = await repository.find(invoice.id.id);

    expect(result.id.id).toBe(invoice.id.id);
  });
});
