import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('StoreReportsService');

    constructor(
        private readonly printerService: PrinterService
    ){
        super();
    }

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Connected to the database');
    }

    async getOrderReportByOrderId(orderId: number){

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true
                    }
                }
            }
        });

        if(!order){
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }

        const docDefinition: TDocumentDefinitions = orderByIdReport({
            data: order as any
        });

        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

}
