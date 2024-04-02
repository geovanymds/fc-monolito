import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./modules/product-adm/repository/product.model";
import { ClientModel } from "./modules/client-adm/repository/client.model";
import { productRoute } from "./modules/product-adm/api/routes/product";
import { clientRoute } from "./modules/client-adm/api/routes/client";
import { checkoutRoute } from "./modules/payment/api/routes/checkout";
import { invoiceRoute } from "./modules/invoice-adm/api/routes/invoice";
import TransactionModel from "./modules/payment/repository/transaction.model";
import InvoiceModel from "./modules/invoice-adm/repository/invoice.model";
import InvoiceItemModel from "./modules/invoice-adm/repository/invoice-item.model";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel, ClientModel, TransactionModel, InvoiceModel, InvoiceItemModel]);
  await sequelize.sync();
}
setupDb();
