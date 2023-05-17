export function load({ cookies }) {
    const fullname = cookies.get('fullname')
    return {
        fullname
    }
}