<script>
    import Modal from "../../lib/modal.svelte";
    export let data
    export let form
    let products = data.products
    let userData = data.userData
    let cartModal = form?.cartModal

    const isValidUrl = urlString => {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}
</script>

<main>    
    <h2>Ocasiones especiales</h2>
    <div class="section special">
        <img src="assets/mother1.jpg" alt="">
        <img src="assets/mother2.jpg" alt="">
        <img src="assets/mother3.jpg" alt="">
        <img src="assets/mother4.jpg" alt="">
    </div>
    <h2>Productos</h2>
    <div class="section products">
        {#if products.length > 0}
            {#each products as product}
                <div class="product-card">
                    {#if isValidUrl(product['url-img'])}
                        <img class="product-img" src={product['url-img']} alt="">
                    {:else}
                        <img class="img-placeholder" src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg" alt="">
                    {/if}
                    <div class="product-info">
                        <span class="product-name">{product.name}</span>
                        <span class="product-price">$ {product.price}</span>
                        <form method="POST" action="?/addToCart">
                            <input type="text" name="user-id" value={userData['user-id']} style="display: none">
                            <input type="text" name="product-id" value={product['product-id']} style="display: none">
                            {#if userData['user-id'] != ''}
                                {#if product['stock'] > 0}
                                    <button class="product-button" type="submit">Añadir al carrito</button>    
                                {:else}
                                    <p>Sin existencias</p>
                                {/if}
                            {/if}
                            
                        </form>
                    </div>
                </div>
            {/each}   
        {:else}
            <h2>Por ahora no hay productos en el catalogo</h2>
        {/if}

        
    </div>

    {#if cartModal}
        <Modal title="Se agregó al carrito" buttonText='Continuar' action={() => {
            cartModal = false
        }} />
    {/if}
</main>

<style>
    main {
        padding: 100px;
    }

    main span {
        font-size: 18px;
    }

    .section {
        margin-bottom: 100px;
    }

    h2 {
        color: #b5a337;
    }

    .special {
        display: flex;
        justify-content: space-between;
    }

    .special img {
        width: 25%;
    }


    .products {
        display: flex;
        flex-wrap: wrap;
        row-gap: 50px;
        column-gap: 50px;
    }

    .product-card {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 20%;
        border: 2px solid rgb(198, 198, 198);
        border-radius: 20px;
        overflow: hidden;
    }

    .img-placeholder {
        width: 100%;
        height: 350px;
        object-fit: cover;

    }

    .product-img {
        width: 100%;
        height: 350px;
        object-fit: cover;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .product-price {
        font-weight: bold;
    }

    .product-button {
        margin-top: 10px;
        flex-grow: 2;
        border: none;
        padding: 10px;
        background-color: black;
        color: white;
    }

    .product-button:hover {
        background-color: rgb(70, 70, 70);
        cursor: pointer;
    }
</style>