let Faker = require('faker')
let fs = require('fs')

PII_PHI = {
	member_id(){
		return Math.random().toString().slice(2, 12)
	},
	
	person_code(){
		return Math.random().toString().slice(2, 4)
	},
	
	first_name(){
		return Faker.name.firstName()
	},

	last_name(){
		return Faker.name.lastName()
	},

	date_of_birth(){
		return Faker.date.between(1930, 2017).toISOString().slice(0, 10)
	},

	gender(){
		return ['male', 'female'][Math.floor(Math.random() * 2)]
	},

	ssn(){
		return Math.random().toString().slice(2, 11)
	},

	address_1(){
		return Faker.address.streetAddress()
	},

	address_2(){
		return [Faker.address.secondaryAddress(), ''][Math.floor(Math.random() * 2)]
	},

	city(){
		return Faker.address.city()
	},

	state(){
		return Faker.address.stateAbbr()
	},

	zip(){
		return Faker.address.zipCode()
	},	

	primary_first_name(){
		return Faker.name.firstName()
	},	

	primary_last_name(){
		return Faker.name.lastName()
	},	

	prescription_number(){
		return Math.random().toString().slice(2, 10)
	}
}

const anonymize = (entryTitle, value) => {
	return PII_PHI[entryTitle] ? PII_PHI[entryTitle]() : value
}

const writeError = (err) => {
	if (err) throw err	
}

// This will create a copy in-memory before writing it to disk
// which could cause issues for very large data sets
const writeBulk = (outputFd, userData) => {
	fs.write(outputFd, JSON.stringify(userData, anonymize, '\t'), writeError)
}

// Less elegant but more memory efficient as the 
// full copy is never stored in memory
const writeMemoryConscious = (outputFd, userData) => {
	fs.write(outputFd, '[', writeError)
	userData.forEach((item, idx) => {
		let comma = idx == 0 ? '' : ','
		fs.write(outputFd, comma + JSON.stringify(item, anonymize), writeError)
	})
	fs.write(outputFd, ']', writeError)
}

module.exports = {
	writeMemoryConscious: writeMemoryConscious,
	writeBulk: writeBulk
}

