class ProductManager{
    constructor(){
        this.products =[]
        this.nextId = 1
    }

    addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("El producto no es válido")
            return
        }

        if (this.isCodeDuplicate(product.code)) {
            console.log("El código del producto ya está en uso")
            return
        }

        product.id = this.nextId++
        this.products.push(product)
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id)
        if (product) {
            return product
        } else {
            console.log( "Producto no encontrado")
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code)
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: "Camiseta de G2 Esports",
    description: "Camiseta de League of Legends 2024",
    price: 62,
    thumbnail: 'ruta/Camiseta-G2-01.jpg',
    code: 'G2-001',
    stock: 4
})


productManager.addProduct({
    title: "Camiseta de Fnatic",
    description: "Camiseta de League of Legends 2024",
    price: 62,
    thumbnail: 'ruta/Camiseta-Fnatic-01.jpg',
    code: 'FNC-001',
    stock: 3
})

productManager.addProduct({
    title: "Camiseta de G2 Esports ",
    description: "Camiseta de Csgo 2024",
    price: 45,
    thumbnail: 'ruta/Camiseta-G2-13.jpg',
    code: 'G2-101',
    stock: 12
    
})

productManager.addProduct({
    title: "Camiseta de G2 Esports",
    description: "Camiseta de Valorant 2023",
    price: 34,
    thumbnail: 'ruta/Camiseta-G2-23.jpg',
    code: 'G2-301',
    stock: 1
    
})


const productos = productManager.getProducts()
const producto = productManager.getProductById(3)

console.log(producto)
