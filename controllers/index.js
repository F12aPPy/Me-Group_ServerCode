const enterprises = require('./AboutUs/about_us.controller');
const employees = require('./employee/employee.controller');
const services = require('./services/service.controller');
const goals = require('./goal/goal.controller');
const ContractUs = require('./contractUs/contract_us.controller');
const user_admin = require('./user_admin/user_admin.controller');
const enterprise_img = require('./AboutUsImage/aboutUs_img.controller');
const mbti = require('./MBTI/mbti.controller');
const role = require('./role/role.controller');
const serviceUs = require('./serviceUs/serviceUs.controller');

module.exports = {
    enterprises: {
        Insert: enterprises.Insert,
        Update: enterprises.Update,
        Get: enterprises.Get,
        // GetbyID: enterprises.GetByID,
        // Delete: enterprises.Delete
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
        Delete: services.Delete
    },
    goals: {
        Insert: goals.Insert,
        Update: goals.Update,
        List: goals.List,
        GetbyID: goals.GetByID,
        Delete: goals.Delete,
        WebList: goals.WebList
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
        Delete: user_admin.Delete,
        GetByUsername: user_admin.GetByUsername,
    },
    enterprise_img: {
        Insert: enterprise_img.Insert,
        Update: enterprise_img.Update,
        List: enterprise_img.List,
        GetByID: enterprise_img.GetByID,
        Delete: enterprise_img.Delete
    },
    mbti: {
        Insert: mbti.Insert,
        Get: mbti.List,
    },
    role: {
        Insert: role.Insert,
        Get: role.List,
    },
    serviceUs: {
        Insert: serviceUs.Insert,
        Update: serviceUs.Update,
        List: serviceUs.List,
        GetbyID: serviceUs.GetByID,
        Delete: serviceUs.Delete
    }
};