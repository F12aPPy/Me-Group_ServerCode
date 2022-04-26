const enterprises = require('./AboutUs/about_us.controller');
const employees = require('./employee/employee.controller');
const services = require('./services/service.controller');
const goals = require('./goal/goal.controller');
const ContractUs = require('./contractUs/contract_us.controller');
const user_admin = require('./user_admin/user_admin.controller');


module.exports = {
    enterprises: {
        Insert: enterprises.Insert,
        Update: enterprises.Update,
        List: enterprises.List,
        GetbyID: enterprises.GetByID,
        Delete: enterprises.Delete
    },
    employees: {
        Insert: employees.Insert,
        Update: employees.Update,
        List: employees.List,
        GetbyID: employees.GetByID,
        Delete: employees.Delete
    },
    services: {
        Insert: services.Insert,
        Update: services.Update,
        List: services.List,
        GetbyID: services.GetByID,
        Delete: services.Delete,
        UploadFile: services.uploadFile
    },
    goals: {
        Insert: goals.Insert,
        Update: goals.Update,
        List: goals.List,
        GetbyID: goals.GetByID,
        Delete: goals.Delete
    },
    ContractUs: {
        Insert: ContractUs.Insert,
        Update: ContractUs.Update,
        List: ContractUs.List,
        GetByID: ContractUs.GetByID,
        Delete: ContractUs.Delete
    },
    user_admin: {
        Insert: user_admin.Insert,
        Update: user_admin.Update,
        List: user_admin.List,
        GetByID: user_admin.GetByID,
        Delete: user_admin.Delete
    },
};