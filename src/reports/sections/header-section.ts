import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers";

const logo: Content = {
    image: "src/assets/ION-Software.png",
    height: 100,
    width: 100,
    alignment: 'left',
    margin: [0, 0, 0, 20]
};

const currentDate = DateFormater.getDDMMMMYYYY(new Date());

interface HeaderOptions{
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {

    const { title, subtitle, showLogo, showDate } = options;

    const headerLogo: Content = showLogo ?? false ? logo : null;
    const headerDate: Content = showDate ?? false ? { text: currentDate, alignment: 'right', margin: [20, 50], width: 150 } : null;

    const headerTitle: Content = title ? { text: title, style: { bold: true, alignment: 'center', margin: [0, 15, 0, 0], fontSize: 22 }} : null;
    const headerSubtitle: Content = subtitle ? { text: subtitle, style: { bold: true, alignment: 'center', margin: [0, 2, 0, 0], fontSize: 16 }} : null;

    const headerStack: Content = 
    {        
        alignment: 'center',            
        margin: [0, 40, 0, 20], // [left, top, right, bottom]
        stack: [
            headerTitle,
            headerSubtitle
        ]
    };

    return {
        alignment: 'justify',
        columns: [
            headerLogo,
            headerStack,
            headerDate
        ]
    }
}