<script>
    import Modal from "../../lib/modal.svelte";
    import { enhance } from "$app/forms";
    export let form
    export let data
    let products = data.products
    let deleteModal = false
    let editModal = false
    let actualEditProduct = {
        'product-id': 'aaaa',
        'name': '',
        'price': '',
        'url-img': '',
        'stock': ''
    }

    async function deleteProduct(productId) {
        let deleteUrl = `https://springfloreria-eda7b-default-rtdb.firebaseio.com/products/${productId}.json`;
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
        })

        if(response.status == 200) {
            deleteModal = true
            products = products.filter(product => product['product-id'] != productId)
        }
    }

    async function generateReport() {
        const response = await fetch('/api/pdf', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                data: products
            })
        })
        const json = await response.json();
        console.log(json.body.pdf)
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${json.body.pdf}`;
        link.download = 'example.pdf';
        link.click();
    }

</script>

<main>
    <div class="new-product">
        <h2>Nuevo producto</h2>
        <form method="POST" class="new-product__form" action="?/new_product">
            <div class="new-product__input">
                <label for="name">Nombre del producto</label>
                <input type="text" name="name" required>
            </div>
            <div class="new-product__input">
                <label for="price">Precio del producto</label>
                <input type="number" name="price" required>
            </div>
            <div class="new-product__input">
                <label for="url-img">URL Imagen</label>
                <input type="text" name="url-img" required>
            </div>

            <div class="new-product__input">
                <label for="stock">Existencias</label>
                <input type="number" name="stock" required>
            </div>
            <button type="submit" class="custom-button">Agregar</button>
        </form>
    </div>
    <div class="inventory-title">
        <h2>Inventario de productos</h2>
        <button class="custom-button" on:click={generateReport}>Generar reporte de inventario</button>
    </div>
    <div class="products-inventory">
        <table class="products-table">
            <thead>
                <tr>
                    <th>Nombre del producto</th>
                    <th>Precio del producto</th>
                    <th>Imagen del producto</th>
                    <th>Existencias del producto</th>
                    <th>Acciones</th>
                </tr>
                
            </thead>

            <tbody>
                {#each products as product}
                    <tr>
                        <td>{product['name']}</td>
                        <td>{product['price']}</td>
                        <td>{product['url-img']}</td>
                        <td>{product['stock']}</td>
                        <td class="actions">
                            <button on:click={() => {
                                actualEditProduct = product
                                editModal = true
                            }}>
                                <i class="fas fa-edit edit"></i>
                            </button>
                            <button on:click={() => deleteProduct(product['product-id'])}>
                                <i class="fas fa-trash-alt delete" ></i>
                            </button>
                            
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    {#if form?.success}
        <Modal title="Producto agregado correctamente" buttonText='Continuar' action={() => form.success = false} />
    {/if}

    {#if form?.error}
        <Modal title="No se pudo agregar el producto" buttonText='Continuar' action={() => form.error = false} />
    {/if}

    {#if deleteModal}
        <Modal title="Producto eliminado" buttonText='Continuar' action={() => deleteModal = false} />
    {/if}

    {#if editModal}
        <div class="edit-modal">
            <div class="edit-modal__content">
                <h2>Editar producto</h2>
                <form method="POST" action="?/edit_product">
                    <div class="edit-product__input">
                        <label for="product-id">ID del producto</label>
                        <input type="text" name="product-id" required value={actualEditProduct['product-id']} readonly>
                    </div>
                    <div class="edit-product__input">
                        <label for="name">Nombre del producto</label>
                        <input type="text" name="name" required value={actualEditProduct['name']}>
                    </div>
                    <div class="edit-product__input">
                        <label for="price">Precio del producto</label>
                        <input type="number" name="price" required value={actualEditProduct['price']}>
                    </div>
                    <div class="edit-product__input">
                        <label for="url-img">URL Imagen</label>
                        <input type="text" name="url-img" required value={actualEditProduct['url-img']}> 
                    </div>
        
                    <div class="edit-product__input">
                        <label for="stock">Existencias</label>
                        <input type="number" name="stock" required value={actualEditProduct['stock']}>
                    </div>
                    <button type="submit" class="custom-button">Agregar</button>
                    <button class="custom-button" on:click={() => editModal = false} style="background-color: red">Cancelar</button>
                </form>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        padding: 20px 80px;
    }

    .inventory-title {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .inventory-title button {
        height: 50px;
    }

    .edit-modal {
        color: #b5a337;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .edit-modal__content {
        background-color: white;
        width: 500px;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
    }

    .edit-modal__content form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .edit-product__input {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .edit-product__input input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }

    .new-product {
        padding: 20px;
        border-radius: 10px;
        border: 2px solid rgb(159, 159, 159);
    }

    .custom-button {
        padding: 10px 20px;
        border: none;
        color: white;
        background-color: #b5a337;
        font-size: 16px;
    }

    .new-product button:hover {
        cursor: pointer;
        background-color: #92832b;
    }

    .new-product__form {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 20px;
    }

    .new-product__input {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .new-product__input input {
        padding: 10px;
        font-size: 16px;
    }

    .products-inventory {
        height: 500px;
        overflow: auto;
        border: 1px solid rgb(159, 159, 159);
    }

    .products-inventory thead th {
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #b5a337;
        color: white;
    }

    .products-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .products-table th {
        padding: 20px;
    }

    .products-table td {
        text-align: center;
        max-width: 30ch;
        padding: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .actions button {
        background-color: transparent;
        border: none;
    }

    .actions i {
        font-size: 23px;
    }

    .actions i:hover {
        cursor: pointer;
    }

    .edit {
        color: #b5a337;
    }

    .delete {
        color: red;
    }
</style>