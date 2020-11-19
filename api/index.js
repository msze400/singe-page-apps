const router = require('express').Router()

const {
    models: { User, Car, Sale },
} = require('../db')

router.get('/users', async (req, res, next) => {
    try {
        res.send(await User.findAll())
    } catch (err) {
        next(err)
    }
})

router.get('/cars', async (req, res, next) => {
    try {
        res.send(await Car.findAll())
    } catch (err) {
        next(err)
    }
})

router.get('/users/:id/sales', async (req, res, next) => {
    try {
        res.send(
            await Sale.findAll({
                where: { userId: req.params.id },
                include: [Car],
            })
        )
    } catch (err) {
        next(err)
    }
})

router.post('/users/:id/sales', async (req, res, next) => {
    try {
        const sale = await Sale.create({ ...req.body, userId: req.params.id })
        res.send(sale)
    } catch (err) {
        next(err)
    }
})

module.exports = router
