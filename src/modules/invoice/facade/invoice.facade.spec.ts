import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import Address from "../../@shared/domain/value-object/address";


describe("Invoice Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate an invoice", async () => {

    const repository = new InvoiceRepository()
    const addUsecase = new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      addUsecase: addUsecase,
      findUsecase: undefined,
    })

    const invoiceItems = [
        {
            name: "item 1",
            price: 10.0
        },
        {
            name: "item 2",
            price: 15.0
        },
    ];

    const input = {
        id: "1",
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
        items: invoiceItems
    };

    await facade.add(input)

    const invoice = await InvoiceModel.findOne({ where: { id: "1" } })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(input.id)
    expect(invoice.name).toBe(input.name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.street).toBe(input.address.street)
  })

  it("should find an invoice", async () => {

    const facade = InvoiceFacadeFactory.create()

    const invoiceItems = [
        {
            name: "item 1",
            price: 10.0
        },
        {
            name: "item 2",
            price: 15.0
        },
    ];

    const input = {
        id: "1",
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
        items: invoiceItems
    };

    await facade.add(input)

    const invoice = await facade.find({ id: "1" })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(input.id)
    expect(invoice.name).toBe(input.name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.address.street).toBe(input.address.street)
    expect(invoice.address.number).toBe(input.address.number)
    expect(invoice.address.complement).toBe(input.address.complement)
    expect(invoice.address.city).toBe(input.address.city)
    expect(invoice.address.state).toBe(input.address.state)
    expect(invoice.address.zipCode).toBe(input.address.zipCode)
  })
})