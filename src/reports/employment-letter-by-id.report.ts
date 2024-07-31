import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { styles } from "./styles.report";
import { headerSection } from "./sections/header-section";
import { DateFormater } from "src/helpers";

const logo: Content = {
    image: "src/assets/tucan-code-logo.png",
    height: 100,
    width: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
};

interface ReportValues {
    employerName: string;
    employerPosition: string;
    companyName: string;
    employeeName: string;
    employeePosition: string;
    startDate: Date;
    workHours: number;
    workSchedule: string;
    issueDate: string;
}


export const getEmploymentLetterByIdReport = (values: ReportValues): TDocumentDefinitions => {

    const { employerName, employerPosition, companyName, employeeName, employeePosition, startDate, workHours, workSchedule, issueDate } = values;

    const docDefinition: TDocumentDefinitions = {
        styles,
        pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
        header: headerSection({ showLogo: true, showDate: true }),
        content: [
            { 
                text: 'CONSTANCIA DE EMPLEO', 
                style: 'header' 
            },
            { 
                text: `Yo, ${ employerName }, en mi calidad de ${employerPosition} de ${companyName}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormater.getDDMMMMYYYY(startDate)}. \n
                Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
                La jornada laboral del Sr./ Sra. ${employeeName} es de ${workHours} horas semanales, con un horario de ${workSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
                style: 'body'
            },
            { text: 'Atentamente,', style: 'signature' },
            { text: employerName, style: 'signature' },
            { text: employerPosition,  style: 'signature' },
            { text: companyName, style: 'signature' },
            { text: DateFormater.getDDMMMMYYYY(new Date()), style: 'signature',},
        ],

        footer: {
            text: 'Este documento es una constancia de empleo y no representa una garantía de continuidad laboral.',
            style: 'footer'
        }
    };

    return docDefinition;
}