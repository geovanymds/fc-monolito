import Address from "../../../@shared/domain/value-object/address"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Generate invoice use case unit test", () => {

  it("should generate an invoice", async () => {

    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

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

    const result = await usecase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.address).toEqual(input.address)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
    expect(result.items.length).toBe(2)

  })
})