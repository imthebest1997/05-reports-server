import { StyleDictionary } from "pdfmake/interfaces";

export const styles: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 60, 0, 20] // [left, top, right, bottom]
    },

    subheader: {
        fontSize: 15,
        bold: true
    },

    quote: {
        italics: true
    },

    small: {
        fontSize: 8
    },

    signature: {
        fontSize: 14,
        bold: true,
        margin: [0, 5, 0, 0],
        alignment: 'left'
    },

    body: {
        margin: [0, 0, 0, 80],
        alignment: 'justify'
    },

    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
    }
}