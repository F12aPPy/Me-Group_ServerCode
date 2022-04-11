module.exports = (sequelize, DataTypes) => {
    let Employee = sequelize.define("Employee", {
        createdAt: {
          type: "TIMESTAMP",
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.fn("NOW"),
          allowNull: false,
          field: "updated_at",
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "deleted_at",
        },
        employee_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        employee_detail: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        facebook: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        instargram: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        github: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: false,
        } ,   
      }, {tableName: 'Employee'});

    return Employee;
};