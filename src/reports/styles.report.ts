import { StyleDictionary } from "pdfmake/interfaces";

export const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        // alignment: 'center',
        margin: [0, 60, 0, 20] // [left, top, right, bottom]
    },

    header_02: {
        fontSize: 20,
        bold: true,
        margin: [0, 30, 0, 20] // [left, top, right, bottom]
    },

    subheader: {
        fontSize: 15,
        bold: true
    },

    subheader_02: {
        fontSize: 15,
        bold: true,
        margin: [0, 20, 0, 0]
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