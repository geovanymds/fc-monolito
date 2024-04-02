import express, { Request, Response } from "express"
import FindInvoiceUseCase from "../../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../../usecase/generate-invoice/generate-invoice.usecase";
import { InvoiceItem } from "../../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceRepository from "../../repository/invoice.repository";
import Address from "../../../@shared/domain/value-object/address";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());

    try {

        const invoiceItems = req.body.items.map((item: InvoiceItem)=> {
            return {
                name: item.name, 
                price: item.price
            }
        });

        const billingAddress = new Address(
            req.body.address.street, 
            req.body.address.number, 
            req.body.address.complement, 
            req.body.address.city, 
            req.body.address.state, 
            req.body.address.zipCode
        )

        const invoiceDto = {
            name: req.body.name,
            document: req.body.document,
            address: billingAddress,
            items: invoiceItems
        }

        const output = await usecase.execute(invoiceDto);

        const response = {
            ...output,
            address: {
                street: output.address.street,
                number: output.address.number,
                complement: output.address.complement,
                city: output.address.city,
                state: output.address.state,
                zipCode: output.address.zipCode
            }
        }
        res.send(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository());

    try {

        const output = await usecase.execute({id: req.params.id});

        const response = {
            ...output,
            address: {
                street: output.address.street,
                number: output.address.number,
                complement: output.address.complement,
                city: output.address.city,
                state: output.address.state,
                zipCode: output.address.zipCode
            }
        }

        res.send(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})