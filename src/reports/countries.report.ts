import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header-section";
import { countries as Country } from "@prisma/client";
import { footerSection } from "./sections/footer-section";


interface ReportOptions{
    title?: string;
    subtitle?: string;
    countries: Country[];
}

export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subtitle, countries } = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({ 
            title: title ?? 'Countries Report', 
            subtitle: subtitle ?? 'List of countries', 
            showLogo: true,
            showDate: true
        }),
        pageMargins: [ 40, 110, 40, 60 ], // [left, top, right, bottom]
        content: [
            {
                layout: 'customLayout01',
                table: {
                  headerRows: 1,
                  widths: [ 50, 50, 50, '*', 'auto', '*' ],
          
                  body: [
                    [ 'ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name' ],
                    ...countries.map(country => [
                        country.id.toString(),
                        country.iso2,
                        country.iso3,
                        { text: country.name, bold: true },
                        country.continent,
                        country.local_name
                    ]),
                  ]
                }
            },

            // Tabla de totales
            {
                text: 'Totals',                
                margin: [0, 30, 0, 0], // [left, top, right, bottom]

                style: {
                    fontSize: 16,
                    bold: true,
                }
            },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 1,
                    widths: [ 50, 50, 70, 150, 'auto', '*' ],
                    body: [
                        [
                            {
                                text: 'Total countries',
                                colSpan: 2,
                                bold: true
                            },
                            {},
                            {
                                text: `${countries.length.toString()} countries`,
                                colSpan: 2,
                                bold: true
                            },
                            // {},
                            {},
                            {}
                        ]
                    ]
                }
            }
        ],
        footer: footerSection
    };
}