import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function POST({request}) {
    let data = await request.json()
    data = data['data']

    const pdfDoc = await PDFDocument.create();
    // Add content to the PDF document
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize()
    // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11
    let x = 0
    let y = 0
    let line = 1
    page.drawText(`ID del producto, Nombre del producto, Precio del producto, Existencias del producto`, {
        x: 50,
        y: height - 5 * fontSize * 0.5,
        size: fontSize
    });
    for(let product of data) {
        page.drawText(`${product['product-id']}, ${product['name']}, ${product.price}, ${product.stock}`, {
            x: 50,
            y: height - 5 * fontSize * line,
            size: fontSize
        });
        line += 0.5
    }
    

    // Serialize the PDF document to a Uint8Array
    const pdfBytes = await pdfDoc.saveAsBase64();

    // Create a response with the PDF content
    const response = new Response(JSON.stringify({
        body: {
            pdf: pdfBytes
        }
    }));

    return response;
}
