import InvoiceFacade from "../facade/invoice-adm.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";


export default class InvoiceAdmFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUseCase(repository);
    const addUsecase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase,
    });

    return facade;
  }
}
