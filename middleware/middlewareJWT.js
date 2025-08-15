const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    try {
        const header = req.headers.authorization || '';
        const [, token] = header.split(' '); // "Bearer <token>"
        if (!token) return res.status(401).json({ message: 'Token manquant' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.sub }; // sub = userId
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};
