const express = require("express")
const { createEmployee, updateEmployee, getEmployee, getEmployeeList, deleteEmployee, inactiveEmployee, getEmployeeInactiveList } = require("../controller/employeePersonalDetails")

const employeePersonalDetailsRouter = express.Router()

employeePersonalDetailsRouter.post("/create", createEmployee)
employeePersonalDetailsRouter.put("/update/:id", updateEmployee)
employeePersonalDetailsRouter.get("/get/:id", getEmployee)
employeePersonalDetailsRouter.get("/get", getEmployeeList)
employeePersonalDetailsRouter.delete("/delete/:id", deleteEmployee)
employeePersonalDetailsRouter.put("/inactive/:id", inactiveEmployee)
employeePersonalDetailsRouter.get("/inactive/list", getEmployeeInactiveList)

module.exports = employeePersonalDetailsRouter;