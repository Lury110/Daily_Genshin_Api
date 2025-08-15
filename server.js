require('dotenv').config(); // charge le .env en tout premier

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const charactersRoute = require('./routes/characters.route');
const weaponsRoute = require('./routes/weapons.route');
const artefactsRoute = require('./routes/artefacts.route');
const bossesRoute = require('./routes/bosses.route');
const materialsRoute = require('./routes/materials.route');

const PORT = Number(process.env.PORT);
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI manquant dans .env');
    process.exit(1);
}

// ---- DB
(async () => {
    try {
        // Avec Mongoose >=7, pas besoin des options useNewUrlParser/useUnifiedTopology
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connecté');
    } catch (err) {
        console.error('❌ Erreur de connexion MongoDB :', err.message);
        process.exit(1);
    }
})();

// ---- App
const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.get('/', (_req, res) => res.json({ message: 'Bonjour back' }));

app.use('/api/auth', authRoutes);
app.use('/character', charactersRoute);
app.use('/weapon', weaponsRoute);
app.use('/artefact', artefactsRoute);
app.use('/boss', bossesRoute);
app.use('/material', materialsRoute);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Handler d’erreurs
app.use((err, _req, res, _next) => {
    console.error('❌', err);
    res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' });
});

// ---- Serveur + arrêt propre
const server = app.listen(PORT, () => {
    console.log(`🚀 Backend sur http://localhost:${PORT}`);
});

function shutdown(signal) {
    console.log(`🛑 ${signal} reçu, arrêt en cours...`);
    server.close(() => process.exit(0));
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
