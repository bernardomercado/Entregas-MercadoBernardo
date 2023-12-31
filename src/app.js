import express from 'express';
import ProductManager from './productManager.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Construir la ruta absoluta al archivo 'products.json'
const dataFilePath = path.resolve(__dirname, '../data/products.json');
const productManager = new ProductManager(dataFilePath);

app.get('/products', async (req, res) => {
    const result = await productManager.getProducts()
    const limit = req.query.limit
    if (typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ payload: result.slice(0, limit) })
})

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await productManager.getProductById(id)
    if (typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ payload: result })
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
