<script>
    export let data;

    let salesData = [];
    data.ordersData.forEach((order) => {
        order["products-detail"].forEach((product, index) => {
            salesData.push({
                "order-id": order["order-id"],
                "order-date": order["order-date"],
                "product-name": product["name"],
                "product-price": product["price"],
                count: order["count"][index],
                total: parseFloat(product["price"]) * order["count"][index],
            });
        });
    });
    console.log(salesData)
    let originalSalesData = [...salesData];
    let productInput = "";
    let startDate = null;
    let endDate = null;

    function filterByProductName(productName) {
        salesData = originalSalesData.filter((sale) =>
            sale["product-name"].includes(productName)
        );
    }

    function filterByDate() {
        if (startDate != null && endDate != null) {
            salesData = originalSalesData.filter((sale) => {
                const currentDate = new Date(sale["order-date"]);
                return (
                    currentDate >= new Date(startDate) &&
                    currentDate <= new Date(endDate)
                );
            });
        }
    }

    async function generateReport() {
        const response = await fetch("/api/pdf", {
            method: "post",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify({
                data: salesData,
            }),
        });
        const json = await response.json();
        const blob = new Blob([json.body.csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "reporte_ventas.csv");
        a.click();
    }
</script>

<main>
    <div class="title">
        <h2>Ventas</h2>
        <button class="custom-button" on:click={generateReport}
            >Generar reporte de ventas</button
        >
        <div>
            <label for="">Fecha inicial</label>
            <input type="date" bind:value={startDate} on:input={filterByDate} />
        </div>

        <div>
            <label for="">Fecha final</label>
            <input type="date" bind:value={endDate} on:input={filterByDate} />
        </div>

        <div>
            <label for="">Busqueda por producto</label>
            <input
                type="text"
                bind:value={productInput}
                on:input={() => filterByProductName(productInput)}
            />
        </div>
    </div>
    <table>
        <thead>
            <th>ID Pedido</th>
            <th>Fecha del pedido</th>
            <th>Nombre del producto</th>
            <th>Precio del producto</th>
            <th>Cantidad</th>
            <th>Total</th>
        </thead>
        <tbody>
            {#each salesData as sale}
                <tr>
                    <td>{sale['order-id']}</td>
                    <td>{sale['order-date']}</td>
                    <td>{sale['product-name']}</td>
                    <td>{sale['product-price']}</td>
                    <td>{sale['count']}</td>
                    <td>{sale['total']}</td>
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
