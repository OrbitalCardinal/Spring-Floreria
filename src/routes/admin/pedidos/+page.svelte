<script>
    export let data;
</script>

<main>
    <h2>Pedidos</h2>
    <table>
        <thead>
            <th>ID Pedido</th>
            <th>Fecha del pedido</th>
            <th>Nombre del cliente</th>
            <th>Dirección del cliente</th>
            <th>Telefono del cliente</th>
            <th>Correo del cliente</th>
            <th>Dirección alternativa</th>
            <th>Productos del pedido</th>
        </thead>
        <tbody>
            {#each data.ordersData as order}
                <tr>
                    <td>{order["order-id"]}</td>
                    <td>{order["order-date"]}</td>
                    <td>{order["user-fullname"]}</td>
                    <td>{order["user-address"]}</td>
                    <td>{order["user-phone"]}</td>
                    <td>{order["user-email"]}</td>
                    <td>{order["alt-address"]}</td>
                    <td>
                        {#each order["products-detail"] as product, i}
                            <b><span>#{order["count"][i]}</span></b>
                            <b><span>{product["name"]}</span></b> 
                            <span> | ${product["price"]} x {order["count"][i]} = ${parseFloat(product["price"]) * order["count"][i]}</span>
                            <br />
                        {/each}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
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
