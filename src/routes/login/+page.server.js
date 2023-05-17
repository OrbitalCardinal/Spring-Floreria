import userDataStore from '../../stores/userData.js';
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
    let userData = Object.values(data)[0];
    
    if(userData['password'] === object['password']) {
        cookies.set('fullname', userData.fullname, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
          })
        return { success: true }
    } else {
        return { error: true }
    }
  },
};
