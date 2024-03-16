import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice-item";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {

    async add(invoice: Invoice): Promise<void> {

        const invoiceItems = invoice.items.map((item: InvoiceItem) => {
            return {
                id: item.id.id,
                name: item.name,
                price: item.price
            }
        });

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoiceItems,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, {
            include: [{ model: InvoiceItemModel }]
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id }, include: [{ model: InvoiceItemModel }]});

        if (!invoice) {
            throw new Error("Invoice not found");
        }

        const invoiceItems = invoice.items.map((item: InvoiceItemModel) => {
            return new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })
        });

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipCode
            ),
            items: invoiceItems,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        });
    }

}