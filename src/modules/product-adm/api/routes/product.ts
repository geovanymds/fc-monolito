import express, { Request, Response } from "express"
import AddProductUseCase from "../../usecase/add-product/add-product.usecase"
import ProductRepository from "../../repository/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository());

    try {

        const addProductDto = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const output = await usecase.execute(addProductDto);
        res.send(output);
        
    } catch (err) {
        res.status(500).send(err);
    }
})