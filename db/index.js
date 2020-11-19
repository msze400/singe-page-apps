const Sequelize = require('sequelize')

//What  if you dont want to store primary keys as integers use Unique Identifiers UUID
const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize
const conn = new Sequelize(
    process.env.DATASBASE_URL || 'postgres://localhost/acme_car_sales_db'
)

const User = conn.define('user', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: STRING,
})

const Car = conn.define('car', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: STRING,
})

const Sale = conn.define('sale', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },

    extendedWarranty: {
        type: BOOLEAN,
        defaultValue: false,
    },
})

Sale.belongsTo(User)
Sale.belongsTo(Car)

const syncAndSeed = async () => {
    await conn.sync({ force: true })
    const [moe, lucy, larry] = await Promise.all(
        ['moe', 'lucy', 'larry'].map((name) => User.create({ name }))
    )
    const [ford, toyota, audi] = await Promise.all(
        ['ford', 'toyota', 'audi'].map((name) => Car.create({ name }))
    )

    const sales = await Promise.all([
        Sale.create({ userId: moe.id, carId: ford.id }),
        Sale.create({ userId: moe.id, carId: ford.id, extendedWarranty: true }),
    ])
}

module.exports = {
    models: {
        User,
        Car,
        Sale,
    },
    conn,
    syncAndSeed,
}
