const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('../secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/menu', async (_, response) => {
	const collection = await getCollection('foodtruck-api', 'menu')
	const menu = await collection.find().toArray()
	const menuId = menu.map((menu) => {
		return { ...menu, id: menu._id };
	})
	console.log(menu)
	response.json(menuId)
	
})

router.post('/menu', async (request, response) => {
    const { name, price, image, description } = request.body
    const collection = await getCollection('foodtruck-api', 'menu')
    const result = await collection.insertOne({ name, price, image, description })

    response.json({ result })
})



// Events

router.get('/events', async (_, response) => {
	const collection = await getCollection('foodtruck-api', 'events')
	const events = await collection.find().toArray()
	const eventId = events.map((events) => {
		return { ...events, id: events._id };
	})
	console.log(events)
	response.json(eventId)
	
})

module.exports = router