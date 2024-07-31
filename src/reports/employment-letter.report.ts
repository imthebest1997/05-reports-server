import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { styles } from "./styles.report";
import { DateFormater } from "src/helpers";
import { headerSection } from "./sections/header-section";

const logo: Content = {
    image: "src/assets/tucan-code-logo.png",
    height: 100,
    width: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
};

export const getEmploymentLetterReport = (): TDocumentDefinitions => {

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
                text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado]. \n
                Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
                La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.\n
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
                style: 'body'
            },
            { text: 'Atentamente,', style: 'signature' },
            { text: '[Nombre del Empleador]', style: 'signature' },
            { text: '[Cargo del Empleador]',  style: 'signature' },
            { text: '[Nombre de la Empresa]', style: 'signature' },
            { text: '[Fecha de Emisión]', style: 'signature',},
        ],

        footer: {
            text: 'Este documento es una constancia de empleo y no representa una garantía de continuidad laboral.',
            style: 'footer'
        }
    };

    return docDefinition;
}