const db = require("../db")

async function employee(){
    try{
        const database = await db()
        const employeeModel = await database.collection("employee_personal_details", {
            validator:{
                $jsonschema:{
                    bsonType: 'object',
                    title: 'employee_personal_details',
                    properties:{
                        name: {
                            bsonType: 'string'
                        },
                        age:{
                            bsonType: 'number'
                        },
                        address:{
                            bsonType: 'string'
                        },
                        phoneNumber:{
                            bsonType: 'string'
                        },
                        email:{
                            bsonType: 'string'
                        },
                        isActive:{
                            bsonType: 'boolean',
                            default: true
                        }
                    },
                    // required: ["name", "age", "phoneNumber", "email", "address", "isActive"]
                }
            }
        })
        return employeeModel
    }
    catch(err){
        console.log("error user model", err)
        return false
    }
}

module.exports = employee