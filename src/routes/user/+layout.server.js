export async function load({ cookies }) {
    let userData = {}
    userData['fullname'] = cookies.get('fullname')
    userData['email'] = cookies.get('email')
    userData['user-id'] = cookies.get('user-id')
    userData['address'] = cookies.get('address')

    let cartUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/cart.json?orderBy="user-id"&equalTo="${userData['user-id']}"`
    const response = await fetch(cartUrl, {
        method: 'GET'
    })

    let data = await response.json()
    let cartData = []
    Object.keys(data).forEach(key => {
        cartData.push(data[key])
    })
    
    if(userData['user-id']) {
        return {
            cartData: cartData,
            userData: userData
        }
    } else {
        return {
            cartData: [],
            userData: null
        }
    }
    
}