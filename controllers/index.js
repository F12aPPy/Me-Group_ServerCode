const enterprises = require('./enterprise.controller');


module.exports = {
    enterprises: {
        Insert: enterprises.Insert,
        Update: enterprises.Update,
        List: enterprises.List,
        GetbyID: enterprises.GetByID,
        Delete: enterprises.Delete
    },
};