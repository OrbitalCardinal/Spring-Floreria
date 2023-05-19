<script>
    import Modal from "../../../lib/modal.svelte";
    export let data
    export let form
    let userData = data.userData
    let cartProducts = data.cartProducts
    let total = 0
    cartProducts.forEach(product => {
        total = total + parseInt(product['price']) * parseInt(product['count'])
    })

    async function buy() {
        if(cartProducts.length == 0) {
            emptyModal = true;
            return
        }

        cartProducts.forEach(product => {
            console.log(product)
        })
    }

</script>

<main>
    <div class="checkout">
        <div class="cart-products">
            <h2>Carrito de compras</h2>
            <div class="cart-table">
                <table>
                    <thead>
                        <th>Foto del producto</th>
                        <th>Nombre del producto</th>
                        <th>Precio del producto</th>
                        <th>Numero de productos</th>
                    </thead>
                    <tbody>
                        {#each cartProducts as product}
                            <tr>
                                <td><img src={product['url-img']} alt=""></td>
                                <td>{product['name']}</td>
                                <td>{product['price']}</td>
                                <td>{product['count']}</td>
                            
                            </tr>
                            {/each}
                    </tbody>
                </table>
            </div>
            <form method="POST" action="?/empty_cart">
                <button type="submit" class="custom-button">Vaciar carrito</button>
            </form>
            <h2 class="total">Total: ${total}</h2>
        </div>

        <form action="?/buy" method="POST" class="payment">
            <h2>Checkout</h2>
            <!-- <h3>Información del cliente</h3> -->
            <b>Nombre completo:</b>
            <span>{userData['fullname']}</span>
            
            <b>Dirección de entrega:</b>
            <span>{userData['address']}</span>

            <b>Correo de contacto:</b>
            <span>{userData['email']}</span>

            <b>Telefono de contacto:</b>
            <span>{userData['phone']}</span>

            <b><label for="">Dirección alternativa:</label></b>
            <input type="text" name="user-id" style="display: none" value={userData['user-id']}>
            <input type="text" name="alt-address">

            <h3>Método de pago:</h3>
            <label for="">Numero de tarjeta:</label>
            <input type="text">

            <label for="">Expiración de tarjeta:</label>
            <input type="text">

            <label for="">CVV</label>
            <input type="text">

            <button class="custom-button" type="submit">Comprar</button>
        </form>
    </div>
    {#if form?.emptyModal}
        <Modal title="El carrito esta vacio" buttonText='Continuar' action={() => form.emptyModal = false} />
    {/if}
</main>

<style>
    main {
        padding: 40px 80px;
    }

    h2 {
        color: #b5a337;
    }

    .checkout {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 70px;
    }

    .payment {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 700px;
        justify-content: space-between;
        gap: 5px;
    }

    .payment input {
        padding: 10px;
        font-size: 16px;
    }
    
    .cart-products {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .total {
        margin-left: auto;
    }

    .cart-table {
        overflow: auto;
        border: 1px solid gray;
        height: 600px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table img {
        width: 80px;
    }

    table td {
        text-align: center;
        padding: 10px;
        height: 150px;
    }

    table thead th {
        position: sticky;
        top: 0;
        z-index: 2;
        padding: 10px 20px;
        background-color: #b5a337;
        color: white;
    }

    .custom-button {
        padding: 10px 20px;
        border: none;
        color: white;
        background-color: #b5a337;
        font-size: 16px;
    }

    .custom-button:hover {
        background-color: #908025;
        cursor: pointer;
    }

</style>