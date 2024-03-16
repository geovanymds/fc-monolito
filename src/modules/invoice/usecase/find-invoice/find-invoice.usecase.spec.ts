import Address from "../../../@shared/domain/value-object/address";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice-item";
import Id from "../../../@shared/domain/value-object/id.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice(
  {
    id: new Id('1'),
    name: 'invoice test',
    document: 'any_document',
    address: new Address('any street', 'any number', 'any_complement', 'any_city', 'any_state', 'any_zip_code'),
    items: [
      new InvoiceItem(
      {
        name: 'item 1',
        price: 10.5
      }
    ),
    new InvoiceItem(
      {
        name: 'item 2',
        price: 20.0
      }
    )]
  }
)

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find invoice use case unit test", () => {

  it("should find an invoice", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const result = await usecase.execute({id: invoice.id.id})

    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address).toStrictEqual(invoice.address)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toBeDefined()
    expect(result.items[0].name).toEqual(result.items[0].name)
    expect(result.items[0].price).toEqual(result.items[0].price)
    expect(result.items[1].id).toBeDefined()
    expect(result.items[1].name).toEqual(result.items[1].name)
    expect(result.items[1].price).toEqual(result.items[1].price)
  })
})