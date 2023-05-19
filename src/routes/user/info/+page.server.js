import { redirect } from "@sveltejs/kit"

export async function load({cookies}) {
    let userData = {}
    userData['fullname'] = cookies.get('fullname')
    userData['email'] = cookies.get('email')
    userData['user-id'] = cookies.get('user-id')
    userData['address'] = cookies.get('address')
    userData['phone'] = cookies.get('phone')

    if(userData['user-id'] == '') {
        throw redirect(303, '/user')
    }

    return {
        userData: userData
    }
}

export const actions = {
    logout: async ({cookies}) => {
        cookies.set('user-id', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires:0
        })

        cookies.set('fullname', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires:0
        })

        cookies.set('email', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires:0
        })

        cookies.set('address', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires:0
        })

        cookies.set('phone', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires:0
        })
    }
}