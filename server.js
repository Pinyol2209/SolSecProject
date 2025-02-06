const express = require('express');
const path = require('path');
const SPLRugchecker = require('./dist/index.js').default;
const app = express();
const port = 3000;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

app.post('/check-token', async (req, res) => {
    const { tokenAddress } = req.body;
    const rugCheckConfig = {
        solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
        heliusApiKey: process.env.HELIUS_API_KEY,
    };

    const rugChecker = new SPLRugchecker(rugCheckConfig);
    try {
        const result = await rugChecker.check(tokenAddress);
        const score = rugChecker.rugScore(result);
        const isRug = rugChecker.isRug(result);
        res.json({ ...result, rugScore: score, isRug });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 