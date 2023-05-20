export async function load({cookies}) {
    let ordersUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/orders.json`
    const response = await fetch(ordersUrl, {
        method: 'GET'
    })

    let data = await response.json()
    let ordersData = []
    Object.keys(data).forEach(key => {
        ordersData.push({'order-id': key, ...data[key]})
    })
    
    console.log(ordersData)
    return {
        ordersData: ordersData
    }
}