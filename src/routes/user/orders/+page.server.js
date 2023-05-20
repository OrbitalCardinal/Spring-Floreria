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
    return {
        ordersData: ordersData
    }
}