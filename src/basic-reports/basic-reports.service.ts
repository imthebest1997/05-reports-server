import { Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { continentsList, getContinent } from 'src/helpers/get-continent';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetterReport, getEmploymentLetterByIdReport, getCountriesReport } from 'src/reports';


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit{

    private readonly logger = new Logger('BasicReportsService');

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Connected to the database');
    }

    constructor(
        private readonly printerService: PrinterService
    ){
        super();
    }
    
    async hello(){        
        const docDefinition: TDocumentDefinitions = getHelloWorldReport();
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }


    async employmentLetter(){
        const docDefinition: TDocumentDefinitions = getEmploymentLetterReport();
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    async employmentLetterById(employeeId: number){
        const employee = await this.employees.findUnique({ where: {
            id: employeeId
        }});

        if(!employee)
            throw new NotFoundException('Employee not found');

        const docDefinition: TDocumentDefinitions = getEmploymentLetterByIdReport({
            employerName: 'Alejandro Gonzalez',
            employerPosition: 'CEO',
            companyName: 'ION Software',
            employeeName: employee.name,
            employeePosition: employee.position,
            startDate: employee.start_date,
            workHours: employee.hours_per_day,
            workSchedule: employee.work_schedule,
            issueDate: '2021-10-10'
        });
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    async getCountryReport(){
        const countries = await this.countries.findMany({
            where: {
                local_name: {
                    not: null
                }
            }
        });

        if(!countries)
            throw new NotFoundException('Countries not found');

        const docDefinition: TDocumentDefinitions = getCountriesReport({ countries });

        return this.printerService.createPdf(docDefinition);
    }

    async getCountryReportByContinent(continent: string){

        const validContinent = getContinent(continent);

        if(!validContinent)
            throw new NotFoundException('Continent not found');

        try {
            const countries = await this.countries.findMany({
                where: {
                    continent: validContinent,
                    local_name: {
                        not: null
                    }
                }
            });
    
            if(!countries)
                throw new NotFoundException('Countries not found');
    
            const docDefinition: TDocumentDefinitions = getCountriesReport({ 
                title: `Countries in ${continent}`,
                subtitle: 'List of countries',
                countries 
            });
    
            return this.printerService.createPdf(docDefinition);                
        } catch (error) {
            throw new InternalServerErrorException(error.message);            
        }
    }
}
