<script>
    export let data;
    let originalOrdersData = [...data.ordersData]
    let userInput = ''
    let startDate = null
    let endDate = null
    
    function filterByClientName(clientName) {
        data.ordersData = originalOrdersData.filter(order => order['user-fullname'].includes(clientName))
    }

    function filterByDate() {
        if(startDate != null && endDate != null) {
            data.ordersData = originalOrdersData.filter(order => {
                const currentDate = new Date(order['order-date']);
                return currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
            });
        }
    }

    async function generateReport() {
        let pdfData = []
        for(let order of data.ordersData) {
            let productsString = ''
            for(const [index, product] of order['products'].entries()) {
                productsString = productsString + `# ${order['count'][index]}, ${product['name']}`
            }
            pdfData.push({
                'Nombre del cliente': order['user-fullname'],
                'Direccion del cliente': order['user-address'],
                'Telefono del cliente': order['user-phone'],
                'Direccion alternativa': order['alt-address'],
                'Productos': productsString
            })
        }

        const response = await fetch('/api/pdf', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                data: pdfData
            })
        })
        const json = await response.json();
        const blob = new Blob([json.body.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'reporte_pedidos.csv');
        a.click()
    }

</script>

<main>
    <div class="title">
        <h2>Pedidos</h2>
        <button class="custom-button" on:click={generateReport}>Generar reporte de pedidos</button>
        <div>
            <label for="">Fecha inicial</label>
            <input type="date" bind:value={startDate} on:input={filterByDate}>
        </div>

        <div>
            <label for="">Fecha final</label>
            <input type="date" bind:value={endDate} on:input={filterByDate}>
        </div>

        <div>
            <label for="">Busqueda por cliente</label>
            <input type="text" bind:value={userInput} on:input={() => filterByClientName(userInput)}>
        </div>
    </div>
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
            <th>Recoger en sucursal</th>
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
                        {#each order["products"] as product, i}
                            <b><span>#{order["count"][i]}</span></b>
                            <b><span>{product["name"]}</span></b> 
                            <span> | ${product["price"]} x {order["count"][i]} = ${parseFloat(product["price"]) * order["count"][i]}</span>
                            <br />
                        {/each}
                    </td>
                    <td>{order["recoger_sucursal"] == 'off' ? "No": 'Si'}</td>
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
        width: 100%;
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

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .custom-button {
        padding: 10px 20px;
        border: none;
        color: white;
        background-color: #b5a337;
        font-size: 16px;
        height: 50px;
    }

    .custom-button:hover {
        cursor: pointer;
        background-color: #81721d;
    }
</style>
