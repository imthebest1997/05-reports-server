import { Controller, Get, Header, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  @Header('Content-Type', 'application/pdf')
  async getOrderReportByOrderId(@Res() response: Response, @Param('orderId', ParseIntPipe) orderId: number) {
    const pdfDoc = await this.storeReportsService.getOrderReportByOrderId(orderId);

    pdfDoc.info.Title = 'Order-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
