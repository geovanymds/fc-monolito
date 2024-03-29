import express, { Request, Response } from "express"
import AddClientUseCase from "../../../client-adm/usecase/add-client/add-client.usecase";
import ClientRepository from "../../../client-adm/repository/client.repository";
import Address from "../../../@shared/domain/value-object/address"

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository());

    console.log(req.body)

    try {

        const addClientDto = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.address.street,
                req.body.address.number,
                req.body.address.complement,
                req.body.address.city,
                req.body.address.state,
                req.body.address.zipCode
            )
        }

        const output = await usecase.execute(addClientDto);
        res.send(output);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})