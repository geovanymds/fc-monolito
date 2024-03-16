import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice-item";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {

    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      address: new Address(
        input.address.street,
        input.address.number,
        input.address.complement,
        input.address.city,
        input.address.state,
        input.address.zipCode,
      ),
      items: input.items.map((item)=>{
        return new InvoiceItem({
            id: new Id(item.id) || new Id(),
            name: item.name,
            price: item.price
        })
      })
    }

    const invoice = new Invoice(props)
    await this._invoiceRepository.add(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.address.street,
        invoice.address.number,
        invoice.address.complement,
        invoice.address.city,
        invoice.address.state,
        invoice.address.zipCode,
      ),
      items: invoice.items.map((item)=>{
        return {
            id: item.id.id,
            name: item.name,
            price: item.price
        }
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    }
  }
}