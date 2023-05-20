export async function load({cookies}) {
    let userData = {}
    userData['fullname'] = cookies.get('fullname')
    userData['email'] = cookies.get('email')
    userData['user-id'] = cookies.get('user-id')
    userData['address'] = cookies.get('address')

    let productUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products.json';
    const response = await fetch(productUrl, {
        method: 'GET'
    })

    if(response.status == 200) {
        const data = await response.json()
        let newData = []
        if(data) {
            Object.keys(data).forEach(key => {
                newData.push({'product-id': key, ...data[key]})
            })
        }
        return {
            products: newData,
            userData: userData
        }
        
    } else {
        return {
            error: true
        }
    }
}

export const actions = {
    addToCart: async ({request}) => {
        let formData = await request.formData()
        console.log(formData);
        let cartUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart.json'
        const response = await fetch(cartUrl, {
            method: 'POST',
            body: JSON.stringify({
                'user-id': formData.get('user-id'),
                'product-id': formData.get('product-id')
            })
        })

        if(response.status == 200) {
            return {
                cartModal: true
            }
        }
    }
}