import { describe, it, expect, vi, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
process.env.JWT_SECRET = 'test-secret'

import { _makeRegisterHandler } from '../controllers/auth.controller.js'

function makeApp(mockUser, hashFn) {
    const app = express()
    app.use(express.json())
    const register = _makeRegisterHandler(mockUser, hashFn)
    app.post('/api/auth/register', register)
    app.use((err, req, res, next) => {
        if (err?.code === 11000) return res.status(409).json({ message: 'Cet email est déjà utilisé.' })
        res.status(500).json({ message: 'Erreur serveur', details: String(err?.message || err) })
    })
    return app
}

describe('POST /api/auth/register', () => {
    let mockUser, hashFn, app
    beforeEach(() => {
        mockUser = { create: vi.fn() }
        hashFn = vi.fn().mockResolvedValue('HASHED')
        app = makeApp(mockUser, hashFn)
    })

    it('201 quand création ok', async () => {
        mockUser.create.mockResolvedValue({ _id: 'u1' })

        const res = await request(app)
            .post('/api/auth/register')
            .send({ pseudo: 'Bob', email: 'bob@example.com', password: 'abcdefgh' })

        expect(res.status).toBe(201)
        expect(res.body).toEqual({ message: 'Utilisateur créé' })
        expect(mockUser.create).toHaveBeenCalledWith(expect.objectContaining({
            pseudo: 'Bob',
            email: 'bob@example.com',
            password: 'HASHED',
        }))
        expect(hashFn).toHaveBeenCalledWith('abcdefgh', 12)
    })

    it('409 quand email déjà utilisé (code 11000)', async () => {
        mockUser.create.mockRejectedValue(Object.assign(new Error('dup'), { code: 11000 }))

        const res = await request(app)
            .post('/api/auth/register')
            .send({ pseudo: 'Bob', email: 'bob@example.com', password: 'abcdefgh' })

        expect(res.status).toBe(409)
        expect(res.body).toEqual({ message: 'Cet email est déjà utilisé.' })
    })

    it('400 quand validation échoue (email manquant)', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ pseudo: 'Bob', password: 'abcdefgh' })

        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Données invalides')
    })

    it('500 autre erreur serveur', async () => {
        mockUser.create.mockRejectedValue(new Error('DB down'))

        const res = await request(app)
            .post('/api/auth/register')
            .send({ pseudo: 'Bob', email: 'bob@example.com', password: 'abcdefgh' })

        expect(res.status).toBe(500)
        expect(res.body.message).toBe('Erreur serveur')
        expect(res.body.details).toBeDefined()
    })
})
