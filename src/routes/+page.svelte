<script>
    let products = [
        {productName: "Ramo 1", price: 190, imageUrl: "assets/ramo1.jpg"},
        {productName: "Ramo 2", price: 150, imageUrl: "assets/ramo2.jpg"},
        {productName: "Ramo 3", price: 100, imageUrl: "assets/ramo3.jpg"},
        {productName: "Ramo 4", price: 90, imageUrl: "assets/ramo4.jpg"},
        {productName: "Ramo 5", price: 100, imageUrl: "assets/ramo5.jpg"},
        {productName: "Ramo 6", price: 150, imageUrl: "assets/ramo6.jpg"},
        {productName: "Ramo 7", price: 200, imageUrl: "assets/ramo7.jpg"},
        {productName: "Ramo 8", price: 240, imageUrl: "assets/ramo8.jpg"},
        {productName: "Ramo 9", price: 180, imageUrl: "assets/ramo9.jpg"},
        {productName: "Ramo 10", price: 120, imageUrl: "assets/ramo10.jpg"},
        {productName: "Ramo 11", price: 110, imageUrl: "assets/ramo11.jpg"},
        {productName: "Ramo 12", price: 80, imageUrl: "assets/ramo12.jpg"},
    ];

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
        {#each products as product}
        <div class="product-card">
            <img class="product-img" src={product.imageUrl} alt="">
            <div class="product-info">
                <span class="product-name">{product.productName}</span>
                <span class="product-price">$ {product.price}</span>
                <button class="product-button">Añadir al carrito</button>
            </div>
        </div>
        {/each}
    </div>
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
        column-gap: 10px;
        justify-content: space-between;
    }

    .product-card {
        display: flex;
        flex-direction: column;
        width: 20%;
        border: 2px solid rgb(198, 198, 198);
        border-radius: 20px;
        overflow: hidden;
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