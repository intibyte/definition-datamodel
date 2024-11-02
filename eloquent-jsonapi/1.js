/*
 * Create JSON:API instance
 */
import JSONAPI from 'eloquent-jsonapi'

const api = new JSONAPI({
	baseUrl: '/jsonapi/v1'
})

/*
 * Retrieve
 */

// Get one by ID
const user = await api.getOne('users', '1') // this will call make('users') user the hood

const user = await api.getOne('users', '1', {
	include: ['comments'],
})
user.name // 'Maťo'
user.comments // array
user.comments.length // 123
user.comments[0].text // 'some text...'
await user.comments[0].delete()

// Get all
const users = await api.getMany('users', {
	include: ['comments'],
	filter: {
		role: 'worker',
		idIn: ['2', '3']
	},
	page: {
		size: 5,
		number: 2,
	},
	withCount: ['posts'],
	sort: '-createdAt',
})

/*
 * Create
 */

const user = api.make('users')

user.id // null | undefined
user.type // 'users'
user.name = 'Maťo'
user.age = 30

try {
	await user.save()
} catch (error) {
	// handle error
}

user.save()
	.then((user) => {
		// user saved
		user.id // 123
	})
	.error((error) => {
		// error occured
	})

// Create directly
api.create('users', {
	name: 'Maťo',
	age: 30,
}).then((user) => {
	user.id // 123
})
