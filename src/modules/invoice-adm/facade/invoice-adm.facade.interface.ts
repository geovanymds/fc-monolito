import Address from "../../@shared/domain/value-object/address"

type InvoiceItem = {
    id?: string;
    name: string;
    price: number;
}

export interface GenerateInvoiceFacadeInputDto {
    id?: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
}

export interface FindInvoiceFacadeInputDto {
    id: string
  }

export interface FindInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt: Date;
    updatedAt: Date;
}

export default interface InvoiceAdmFacadeInterface {
  add(input: GenerateInvoiceFacadeInputDto): Promise<void>;
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
