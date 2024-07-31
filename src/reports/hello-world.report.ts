import { TDocumentDefinitions } from "pdfmake/interfaces";
import { styles } from "./styles.report";

interface ReportOptions {
    name: string;
}


export const getHelloWorldReport = () => {
    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: 'Hello world', style: 'header' },
            { text: 'This is a sample PDF printed with pdfmake' }
        ],
        styles: styles,
    };

    return docDefinition;
};