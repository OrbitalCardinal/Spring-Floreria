export async function load({cookies}) {
    let userId = cookies.get('user-id')
    let ordersUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/orders.json?orderBy="user-id"&equalTo="${userId}"`
    const response = await fetch(ordersUrl, {
        method: 'GET'
    })

    let data = await response.json()
    let ordersData = []
    Object.keys(data).forEach(key => {
        ordersData.push({'order-id': key, ...data[key]})
    })
    
    let ordersProducts = []
    for(let order of ordersData) {
        let products = []
        for(let productId of order['product-ids']) {
            let productsUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/`
            let productResponse = await fetch(productsUrl + `${productId}.json`, {
                method: 'GET'
            })
            products.push(await productResponse.json())
        }
        ordersProducts.push(products)
    }

    for(var i=0; i<ordersData.length; i++) {
        ordersData[i]['products-detail'] = ordersProducts[i]
    }
    return {
        ordersData: ordersData
    }
}