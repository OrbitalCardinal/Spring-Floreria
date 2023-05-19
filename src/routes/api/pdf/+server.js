function convertObjectsArrayToCsv(objectsArray) {
    if (!Array.isArray(objectsArray) || objectsArray.length === 0) {
      return '';
    }
  
    const headers = Object.keys(objectsArray[0]);
  
    const csvRows = [];
  
    // Generate header row
    const headerRow = headers.join(',');
    csvRows.push(headerRow);
  
    // Generate data rows
    objectsArray.forEach((object) => {
      const values = headers.map((header) => object[header]);
      const dataRow = values.join(',');
      csvRows.push(dataRow);
    });
  
    return csvRows.join('\n');
  }

export async function POST({request}) {
    let data = await request.json()
    console.log(data)
    data = data['data']

    // Serialize the PDF document to a Uint8Array
    const csv = convertObjectsArrayToCsv(data)

    // Create a response with the PDF content
    const response = new Response(JSON.stringify({
        body: {
            csv: csv
        }
    }));

    return response;
}
