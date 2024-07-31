import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers";

const logo: Content = {
    image: "src/assets/tucan-code-logo.png",
    height: 100,
    width: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
};

interface HeaderOptions{
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {

    const { title, subtitle, showLogo, showDate } = options;

    const headerLogo: Content = showLogo ?? false ? logo : null;
    const headerDate: Content = showDate ?? false ? { text: DateFormater.getDDMMMMYYYY(new Date()), alignment: 'right', margin: [20, 20] } : null;
    // const headerTitle: Content = title ? { text: title, style: { bold: true, alignment: 'center' }} : null;
    // const headerSubtitle: Content = subtitle ? { text: subtitle, style: 'subheader', alignment: 'center' } : null;

    return {
        columns: [
            headerLogo,
            headerDate,
        ]
    }
}