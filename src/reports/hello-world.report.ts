import { TDocumentDefinitions } from "pdfmake/interfaces";
import { styles } from "./styles.report";

interface ReportOptions {
    name: string;
}


export const getHelloWorldReport = (data?: string) => {
    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: 'Hello world', style: 'header' },
            { text: 'This is a sample PDF printed with pdfmake' },
            { text: data },
        ],
        styles: styles,
    };

    return docDefinition;
};