const employee = require("../model/employeePersonalDetails");
const {v4: uuidv4} = require("uuid")

let collection;

async function employeePersonalCollection() {
  collection = await employee();
}

async function createEmployee(req, res) {
  try {
    const { name, age, address, phoneNumber, email } = req.body;
    if (!name || !age || !address || !phoneNumber || !email) {
      return res.status(400).send({ message: "Invalid arguments" });
    }
    await collection.insertOne({
        _id: uuidv4(),
        name,
        age,
        address,
        phoneNumber,
        email,
        isActive: true
    });
    res.status(200).send({ message: "Employee successfully created" });
  } catch (err) {
    console.log("createEmployee error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function getEmployee(req, res) {
  try {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send({message: "Invalid arguments"})
    }
    const employeeData = await collection.findOne({_id:id})
    if(employeeData){
        res.status(200).send({message:"Data fetched", data: employeeData})
    }
    else{
        res.status(404).send({message:"No data found"})
    }
  } catch (err) {
    console.log("getEmployee error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function getEmployeeList(req, res) {
  try {
    let {skip, limit} = req.query; // skip and limit for pagination
    if(!skip || !limit) return res.status(400).send({message: "Invalid arguments"})
    skip = parseInt(skip)
    limit = parseInt(limit)

    const employeeData = await collection.aggregate([
      {
          $match: { isActive: true }
      },
      {
          $facet: {
              metadata: [{ $count: "total" }],
              data: [
                  { $skip: skip },
                  { $limit: limit },
                  { $project: { isActive: 0 } }
              ]
          }
      }
  ]).toArray();
  
  const result = {
      total: employeeData[0].metadata.length > 0 ? employeeData[0].metadata[0].total : 0,
      data: employeeData[0].data
  };
  
    res.status(200).send({message: "Data fetched", data: result})

  } catch (err) {
    console.log("getEmployeeList error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function updateEmployee(req, res) {
  try {
    const { name, age, address, phoneNumber, email } = req.body;
    const {id} = req.params;
    if (!name || !age || !address || !phoneNumber || !email || !id) {
      return res.status(400).send({ message: "Invalid arguments" });
    }
    const employeeData = await collection.findOne({_id: id})
    if(employeeData.isActive){
        await collection.findOneAndUpdate({ _id: id },{
            $set: {
              name,
              age,
              address,
              phoneNumber,
              email
              }
          });
          res.status(200).send({ message: "Employee successfully updated" });
    }
    else{
        res.status(400).send({message: "Inactive user cannot be updated"})
    }
    
  } catch (err) {
    console.log("updateEmployee error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send({message: "Invalid arguments"})
    }
    await collection.deleteOne({_id: id})
    res.status(200).send({message: "User deleted successfully"})
  } catch (err) {
    console.log("deleteEmployee error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function inactiveEmployee(req, res){
  try {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send({message: "Invalid arguments"})
    }

    await collection.findOneAndUpdate({_id: id},{$set: {isActive: false}})

    res.status(200).send({message: "User deactivated successfully"})

  } catch (err) {
    console.log("inactiveEmployee error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

async function getEmployeeInactiveList(req, res) {
  try {
    let {skip, limit} = req.query; // skip and limit for pagination
    if(!skip || !limit) return res.status(400).send({message: "Invalid arguments"})
    skip = parseInt(skip)
    limit = parseInt(limit)

    const employeeData = await collection.aggregate([
      {
          $match: { isActive: false }
      },
      {
          $facet: {
              metadata: [{ $count: "total" }],
              data: [
                  { $skip: skip },
                  { $limit: limit },
                  { $project: { isActive: 0 } }
              ]
          }
      }
  ]).toArray();
  
  const result = {
      total: employeeData[0].metadata.length > 0 ? employeeData[0].metadata[0].total : 0,
      data: employeeData[0].data
  };
  
    res.status(200).send({message: "Data fetched", data: result})

  } catch (err) {
    console.log("getEmployeeInactiveList error", err)
    res.status(500).send({
      message: "Internal server error",
    });
  }
}


module.exports = {
  employeePersonalCollection,
  createEmployee,
  getEmployee,
  getEmployeeList,
  updateEmployee,
  deleteEmployee,
  inactiveEmployee,
  getEmployeeInactiveList
};
