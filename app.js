const express  = require('express')
const ProductManager = require('./ProductManager');
const app = express()


const startServer = async () => {
    try {
        const productManager = new ProductManager('./data.json');
        const products = await productManager.getProduct();

        app.get('/products', (req, res) => {
            const { limit }=req.query
        
            if (!limit) return res.send(products);
            const limitedProducts = products.slice(0, parseInt(limit));
            res.send(limitedProducts);
        })

        app.get('/products/:pid', (req,res)=>{
            const { pid } = req.params;
            const product = products.find(p => p.id === parseInt(pid));
            res.send(product);
        })

        app.listen(8080, () => {
            console.log('Servidor corriendo en el puerto 8080');
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();