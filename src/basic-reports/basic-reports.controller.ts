import { Controller, Get, Head, Header, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response){

    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello-World';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response){
    const pdfDoc = await this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Header('Content-Type', 'application/pdf')
  @Get('employment-letter/:employeeId')
  async employmentLetterById(@Res() response: Response, @Param('employeeId', ParseIntPipe) employeeId: number){
    const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }


  @Header('Content-Type', 'application/pdf')
  @Get('countries')
  async getCountryReport(@Res() response: Response, @Query("continent") continent: string){
    let pdfDoc: PDFKit.PDFDocument;

    !continent
      ? pdfDoc = await this.basicReportsService.getCountryReport()
      : pdfDoc = await this.basicReportsService.getCountryReportByContinent(continent);
    
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
