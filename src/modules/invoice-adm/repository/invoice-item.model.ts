import { Column, Model, PrimaryKey, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoices_items",
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false})
  name: string;

  @Column({ allowNull: false})
  price: number;

  @ForeignKey(()=>InvoiceModel)
  @Column({ allowNull: false })
  invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel
}
