function countAndRemoveDuplicates(products) {
    const counts = {};
  
    for (let i = 0; i < products.length; i++) {
      const productId = products[i]['product-id'];
  
      if (counts[productId] === undefined) {
        counts[productId] = 1;
      } else {
        counts[productId]++;
        products.splice(i, 1);
        i--;
      }
    }
  
    for (const product of products) {
      const productId = product['product-id'];
      product.count = counts[productId];
    }
  
    return products;
  }

export async function load({cookies}) {
    let userData = {}
    userData['fullname'] = cookies.get('fullname')
    userData['email'] = cookies.get('email')
    userData['user-id'] = cookies.get('user-id')
    userData['address'] = cookies.get('address')
    userData['phone'] = cookies.get('phone')

    let cartUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart.json?orderBy="user-id"&equalTo="${userData['user-id']}"`
    const response = await fetch(cartUrl, {
        method: 'GET'
    })

    let data = await response.json()
    let cartData = []
    Object.keys(data).forEach(key => {
        cartData.push(data[key])
    })
    
    let productUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/'
    let cartProducts = []
    for(let item of cartData) {
        const productResponse = await fetch(productUrl + `${item['product-id']}.json`, {
            method: 'GET'
        })
        let product = await productResponse.json()
        cartProducts.push({'product-id': item['product-id'], ...product})
    }

    let cartProductsCount =  countAndRemoveDuplicates(cartProducts)
    return {
        userData: userData,
        cartProducts: cartProductsCount
    }
}

export const actions = {
    empty_cart: async ({request, cookies}) => {
        let userId = cookies.get('user-id')
        let cartUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart.json?orderBy="user-id"&equalTo="${userId}"`
        const response = await fetch(cartUrl, {
            method: 'GET'
        })

        let userCart = await response.json()
        let deleteCartUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart/'
        Object.keys(userCart).forEach(async (key) => {
            const deleteResponse = await fetch(deleteCartUrl + `${key}.json`, {
                method: 'DELETE'
            })
        })

        return {
            emptyModal: true
        }
    },
    buy: async ({request, cookies}) => {
        const formData = await request.formData()
        let cartUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart.json?orderBy="user-id"&equalTo="${formData.get('user-id')}"`
        const response = await fetch(cartUrl, {
            method: 'GET'
        })

        let data = await response.json()
        let cartData = []
        Object.keys(data).forEach(key => {
            cartData.push(data[key])
        })
        let productUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/'
        let cartProducts = []
        for(let item of cartData) {
            const productResponse = await fetch(productUrl + `${item['product-id']}.json`, {
                method: 'GET'
            })
            let product = await productResponse.json()
            cartProducts.push({'product-id': item['product-id'], ...product})
        }
        let cartProductsCount =  countAndRemoveDuplicates(cartProducts)
        
        let ordersUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/orders.json'
        let cartCounts = []
        let cartIds = []
        cartProductsCount.forEach(product => {
            cartIds.push(product['product-id'])
            cartCounts.push(product['count'])
        })
        let ordersResponse = await fetch(ordersUrl, {
            method: 'POST',
            body: JSON.stringify({
                'recoger_sucursal': formData.get('sucursal') != null ? formData.get('sucursal'): 'off',
                'user-id': formData.get('user-id'),
                'user-fullname': cookies.get('fullname'),
                'user-email': cookies.get('email'),
                'user-address': cookies.get('address'),
                'user-phone': cookies.get('phone'),
                'product-ids': cartIds,
                'products': cartProductsCount,
                'count': cartCounts,
                'order-date': new Date(),
                'alt-address': formData.get('alt-address')
            })
        })
        // Delete cart
        let deleteCartUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart/'
        Object.keys(data).forEach(async (key) => {
            const deleteResponse = await fetch(deleteCartUrl + `${key}.json`, {
                method: 'DELETE'
            })
        })
        // Reduce stock
        let productsUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/'
        for(let i = 0; i < cartIds.length; i++) {
            let productId = cartIds[i]
            const productResponse = await fetch(productsUrl + `${productId}.json`,{
                method: 'GET',
            })
            const productData = await productResponse.json()
            if(productData  ['stock'] > 0) {
                const stockProductResponse = await fetch(productsUrl + `${productId}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        'stock': productData['stock'] - cartCounts[i]
                    })
                })
            }
        }
    }
}