import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function load({request}) {
    let productUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products.json';
    const response = await fetch(productUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if(response.status == 200) {
        let products = await response.json()
        if(products) {
            let productsJson = []
            Object.keys(products).forEach(key => {
                productsJson.push({'product-id': key, ...products[key]})
            })

            return {
                products: productsJson
            }
        } else {
            return {
                products: []
            }
        }
    } else {
        return {
            products: []
        }
    }

    
    
    

}

export const actions = {
    new_product: async ({request}) => {
        const formData = await request.formData()
        let jsonData = {};
        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        let productUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products.json';
        const response = await fetch(productUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          });
    
          if (response.status === 200) {
            return { success: true };
          } else {
            return { error: true }
          }
    },
    edit_product: async ({request}) => {
        const formData = await request.formData()
        console.log(formData)
        let jsonData = {};
        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });
        const editUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/${formData.get('product-id')}.json`
        const response = await fetch(editUrl, {
            method: 'PATCH',
            body: JSON.stringify(jsonData)
        })

        if(response.status == 200) {
            return {
                editSuccess: true
            }
        } else {
            return {
                editError: false
            }
        }
    }
}