<nav>
    <div>
        <img src="assets/springlogo.jpeg" alt="">
        <a href="/">Inicio</a>
        <a href="/about">Acerca de nosotros</a>
    </div>
    <div>
        <a href="/login">Iniciar sesión</a>
    </div>
</nav>

<main>
    <slot></slot>
</main>

<style>
    nav {
        height: 80px;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }

    div {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    a {
        text-decoration: none;
        color: #b5a337;
    }

    a:hover {
        font-weight: bold;
    }

    img {
        height: 100%;
        padding-right: 20px;
    }
</style>