const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('../secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/', async (_, response) => {
	const collection = await getCollection('foodtruck-api', 'menu')
	const menu = await collection.find().toArray()
	const menuId = menu.map((menu) => {
		return { ...menu, id: menu._id };
	})
	console.log(menu)
	response.json(menuId)
	
})

router.post('/', async (request, response) => {
    const { name, price, image, description } = request.body
    const collection = await getCollection('foodtruck-api', 'menu')
    const result = await collection.insertOne({ name, price, image, description })

    response.json({ result })
})

module.exports = router