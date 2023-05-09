<main>

    <form action="">
        <h2>Nueva cuenta de usuario</h2>
        <label for="fullname">Nombre completo</label>
        <input type="text" name="fullname" required>

        <label for="email">Correo electrónico</label>
        <input type="email" name="email" required>

        <label for="address">Dirección <em>(Calle #, Colonia, Municipio, Estado, C.P)</em> </label>
        <input type="text" name="address" required>

        <label for="password">Contraseña</label>
        <input type="password" name="password" required>

        <label for="confirm-password">Confirmar contraseña</label>
        <input type="password" name="confirm-password" required>

        <button>Crear nueva cuenta</button>

    </form>

    <div class="image-container">
        <img class="bg-img" src="/assets/loginFlowers2.jpg" alt="Arreglo floral">
    </div>
</main>

<style>
    main {
        position: relative;
    }

    .image-container {
        z-index: -1;
        position: absolute;
        width: 1000px;
        height: calc(100vh - 80px);
        overflow: hidden;
        top: 0;
        right: 0;
    }

    .image-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 30%;
        height: calc(100vh - 80px);
        background: linear-gradient(to left, transparent, white); 
    }

    .bg-img {
        height: 100%;
        clip: rect(auto, auto, auto, 60px);
    }

    h2 {
        color: #b5a337;
    }

    form {
        width: 700px;
        height: calc(100vh - 80px);
        padding-left: 90px;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        gap: 20px;
    }

    form label {
        color: #b5a337;
    }

    form input {
        width: 100%;
        height: 30px;
        padding: 20px;
        font-size: 15px;
        outline: 1px solid gray;
        border: none;
    }

    form input:focus {
        outline: 2px solid #b5a337;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #b5a337;
        color: white;
        font-size: 16px;
        font-weight: bold;
        outline: none;
        border: none;
    }

    button:hover {
        background-color: #968524;
    }


</style>

