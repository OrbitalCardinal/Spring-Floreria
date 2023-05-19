<script>
    export let data
</script>

<main>
    <h2>Pedidos</h2>
    {#each data.ordersData as order}
        <h3>Pedido: {order['order-id']}</h3>
        <p>Fecha: {order['order-date']}</p>
        <p>Direccion alternativa: {order['alt-address']}</p>
        <table>
            <thead>
                <th>Nombre del producto</th>
                <th>Precio del producto</th>
                <th>Numero de productos</th>
            </thead>
            <tbody>
                {#each order['products-detail'] as product, i}
                   <tr>
                        <td>{product['name']}</td>
                        <td>{product['price']}</td>
                        <td>{order['count'][i]}</td>
                   </tr> 
                {/each}
            </tbody>
        </table>
    {/each}
</main>

<style>
    main {
        padding: 30px 80px;
    }

    h2 {
        color: #b5a337;
    }

    table {
        border-collapse: collapse;
        border: 1px solid gray;
    }
    
    table thead {
        background-color: #b5a337;
        color: white;
    }

    table th {
        padding: 10px;
    }
    table td {
        text-align: center;
        padding: 10px;
    }
</style>