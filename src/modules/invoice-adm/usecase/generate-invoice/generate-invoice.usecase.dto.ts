import Address from "../../../@shared/domain/value-object/address";

export type InvoiceItem = {
    id?: string;
    name: string;
    price: number;
}

export interface GenerateInvoiceInputDto {
    id?: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
}

export interface GenerateInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt: Date;
    updatedAt: Date;
}