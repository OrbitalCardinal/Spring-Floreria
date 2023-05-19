export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    let usersUrl = 'https://springfloreria-eda7b-default-rtdb.firebaseio.com/users.json?orderBy="email"';
    const response = await fetch(usersUrl + `&equalTo="${object['email']}"`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    let data = await response.json()
    console.log(data)
    let userData = {
      'user-id': Object.keys(data)[0],
      ...data[Object.keys(data)[0]]
    }
    
    if(userData['password'] === object['password']) {
        Object.keys(userData).forEach(key => {
          if(key != 'password' && key != 'confirm-password') {
            cookies.set(key, userData[key], {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30,
            })
          }
        })
        return { success: true }
    } else {
        return { error: true }
    }
  },
};
