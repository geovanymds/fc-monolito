import express, { Request, Response } from "express"
import ProcessPaymentUseCase from "../../usecase/process-payment/process-payment.usecase"
import TransactionRepostiory from "../../repository/transaction.repository"

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new ProcessPaymentUseCase(new TransactionRepostiory());

    try {

        const checkoutDto = {
            orderId: req.body.orderId,
            amount: req.body.amount
        }

        const output = await usecase.execute(checkoutDto);
        res.send(output);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})