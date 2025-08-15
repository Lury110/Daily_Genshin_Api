const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.mongo');

function signToken(userId) {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
}

exports.register = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;

        // hash du mot de passe
        const hash = await bcrypt.hash(password, 12);

        const user = await User.create({
            pseudo,
            email: email.toLowerCase().trim(),
            password: hash
        });

        // ne jamais renvoyer le hash au client
        const token = signToken(user._id);
        return res.status(201).json({
            message: "Utilisateur créé"
        });
    } catch (err) {
        // conflit email unique
        if (err?.code === 11000) {
            return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
        }
        return res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Identifiants invalides' });

        const token = signToken(user._id);
        return res.json({
            user: { id: user._id, pseudo: user.pseudo, email: user.email },
            token
        });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};

// Exemple de "profile / me"
exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('_id pseudo email createdAt updatedAt');
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};
