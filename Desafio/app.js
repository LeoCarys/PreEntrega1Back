const fs = require('fs').promises;

class ProductManager {
    static lastId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                ProductManager.lastId = Math.max(...this.products.map(product => product.id));
            }
        } catch (error) {
            console.log('Error al cargar Producto', error);
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.log('Error al cargar Producto', error);
        }
    }

    async addProduct(product) {
        product.id = ++ProductManager.lastId;
        this.products.push(product);
        await this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct, id };
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

const productManager = new ProductManager('./Desafio/products.json');


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

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);


const productId = 1;
const productById = productManager.getProductById(productId);
console.log(`Producto con ID ${productId}:`, productById);


const productToUpdate = {
    title: "Nueva Camiseta de G2 Esports",
    description: "Camiseta de League of Legends 2024 actualizada",
    price: 70,
    thumbnail: 'ruta/Camiseta-G2-01.jpg',
    code: 'G2-001',
    stock: 6
};
productManager.updateProduct(productId, productToUpdate);


productManager.deleteProduct(productId);
console.log(`Producto con ID ${productId} eliminado`);


const remainingProducts = productManager.getProducts();
console.log("Productos restantes:", remainingProducts);



