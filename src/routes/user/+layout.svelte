<script>
    export let data
    let userData = data.userData
</script>

<nav>
    <div>
        <img src="../assets/springlogo.jpeg" alt="">
        <a href="/user">Inicio</a>
        <!-- <a href="/about">Acerca de nosotros</a> -->
    </div>
    <div>

        {#if userData}
            <a class="cart-button" href="/user/cart"><i class="fas fa-shopping-cart"></i></a>
            <p class='cart-count'><b>{data.cartData.length}</b> productos</p>
            <a href="/user/info">{userData.fullname}</a>
            <a href="/user/orders">Pedidos</a>
        {:else} 
            <a href="/user/signin">Registrarse</a>
            <a href="/user/login">Iniciar sesión</a>        
        {/if}
    
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

    .cart-count {
        color: #b5a337;
    }

    a:hover {
        font-weight: bold;
        cursor: pointer;
    }

    img {
        height: 100%;
        padding-right: 20px;
    }

    .cart-button {
        border: none;
        background-color: transparent;
    }

    .cart-button:hover {
        cursor: pointer;
    }

    .cart-button i {
        font-size: 25px;
        color: #b5a337;
    }
</style>