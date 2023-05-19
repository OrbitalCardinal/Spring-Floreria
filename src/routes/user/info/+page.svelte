<script>
    import { redirect } from "@sveltejs/kit"
    export let data
    let userData = data.userData

    if(userData['user-id'] == '') {
        throw redirect(307, '/user')
    }
</script>

<main>
    <h2>Información de usuario</h2>
    <h3>Nombre de usuario</h3>
    <p>{userData['fullname']}</p>
    <h3>Dirección registrada</h3>
    <p>{userData['address']}</p>
    <h3>Email registrado</h3>
    <p>{userData['email']}</p>
    <h3>Telefono registrado</h3>
    <p>{userData['phone']}</p>

    <form method="POST" action="?/logout">
        <button class="custom-button" type="submit">Cerrar sesión</button>
    </form>
</main>

<style>
    main {
        padding: 30px 70px;
    }

    .custom-button {
        padding: 10px 20px;
        border: none;
        color: white;
        background-color: #b5a337;
        font-size: 16px;
    }

    .custom-button:hover {
        cursor: pointer;
    }
</style>