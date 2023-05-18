export const actions = {
  register: async ({ request }) => {
    const formData = await request.formData();
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    let usersUrl =
      'https://springfloreria-eda7b-default-rtdb.firebaseio.com/users.json';
    if (formData.get('password') === formData.get('confirm-password')) {
      const checkResponse = await fetch(usersUrl + `?orderBy="email"&equalTo="${object['email']}"`, {
        method: 'GET'
      })

      let checkData = Object.values(await checkResponse.json())
      
      if(checkData.length > 0) {
        return {
          emailExists: true
        }
      }
      const response = await fetch(usersUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      });

      if (response.status === 200) {
        return { success: true };
      }
    }
  },
};
