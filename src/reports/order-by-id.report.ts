import { Content, TDocumentDefinitions } from "pdfmake/interfaces"
import { styles } from "./styles.report"
import { footerSection } from "./sections/footer-section"
import { CurrencyFormater } from "src/helpers/currency-formater"
import { DateFormater } from "src/helpers"
import { text } from "stream/consumers"
import { TAXES } from "src/constants/constants"

const logo: Content = {
    image: 'src/assets/ION-Software.png',
    width: 100,
    height: 100,    
    margin: [10, 20], // [left, top, right, bottom]
}

interface ReportValues{
    title?: string,
    subtitle?: string,
    data: CompleteOrder
}

export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
    const {data} = values;
    const { customers, order_details, order_id, order_date  } = data;

    const subtotal = order_details.reduce((acc, item) => {
        const price = parseFloat(item.products.price);
        const quantity = item.quantity;
        return acc + (price * quantity);
    }, 0); // Inicializa el acumulador en 0

    const taxes = subtotal * TAXES;
    const total = subtotal * (1 + TAXES);

    return {
        styles: styles,
        header: {
            columns: [
                logo,
                {
                    text: 'ION Software Co.',
                    style: 'header_02',
                    margin: [10, 60, 0, 30], // [left, top, right, bottom]
                }
            ]
        },
        footer: footerSection,
        pageMargins: [ 40, 120, 40, 60 ], // [left, top, right, bottom]
        content: [
            {
                columns: [
                    // Address
                    {
                        text: '15 Main St., Suite 200 \n Houston, TX 77001, USA \n BN: 1234567890\n Tel: +1 123 456 7890\n Email: chito@mail.com',
                        // style: 'subheader'
                    },

                    // Invoice
                    {
                        text: [
                            { text: 'Invoice No.', bold: true},
                            `${ order_id }\n`,
                            { text: "Date: ", bold: true},
                            `${ DateFormater.getDDMMMMYYYY(new Date()) }\n `,
                            { text: "Due Date: ", bold: true},
                            `${DateFormater.getDDMMMMYYYY(new Date(order_date)) } \n`,
                            { text: "Status: ", bold: true},
                            "Paid\n",
                            { text: "Payment Method: ", bold: true},
                            "Credit Card\n",                            
                        ],
                        alignment: 'right',
                        marginBottom: 10
                    },
                ]
            },
            // QR
            { qr: 'https://ion-sofware.com', fit: 100, alignment: 'right' },

            // Dirección del cliente
            {
                text: [
                    { text: 'Bill To: \n', style: 'subheader_02'},
                    `${customers.customer_name}\n`,
                    `${customers.address}\n`,
                    `${customers.city}, ${customers.postal_code}\n`,
                    `${customers.country}\n`,
                ]
            },

            // Detalles de la orden
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Description', 'Qty', 'Price', 'Total'],
                        ...order_details.map((item) => {
                            const price = parseFloat(item.products.price);
                            const quantity = item.quantity;
                            const total = price * quantity;
                            return [
                                item.product_id,
                                item.products.product_name,
                                quantity,
                                CurrencyFormater.currencyFormater(price), // Asegúrate de que el precio esté formateado como un número con dos decimales
                                {
                                    text: CurrencyFormater.currencyFormater(total), // Asegúrate de que el total esté formateado como un número con dos decimales
                                    alignment: 'right'
                                }
                            ];
                        }),
                    ],
                }
            },

            // Totales
            "\n\n",

            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        layout: 'noBorders',
                        table: {
                            widths: ['*', 'auto'],
                            body: [
                                [{ text: 'Subtotal', bold: true}, {
                                    text: CurrencyFormater.currencyFormater(subtotal),
                                    alignment: 'right'
                                }],
                                [{ text: 'Tax (15%)', bold: true}, {
                                    text: CurrencyFormater.currencyFormater(taxes),
                                    alignment: 'right'
                                }],
                                [{ text: 'Total', bold: true}, {
                                    text: CurrencyFormater.currencyFormater(total),
                                    alignment: 'right'
                                }],
                            ]
                        }       
                    }

                ]
            },

            
        ]
    }
}