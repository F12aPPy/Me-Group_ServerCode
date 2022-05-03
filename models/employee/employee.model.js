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
        emp_fname: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        emp_lname: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        mbti_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        emp_class: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        emp_quote: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        emp_contract: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        emp_img: {
          type: DataTypes.TEXT,
          allowNull: true,
        } ,   
      }, {tableName: 'Employee'});

    return Employee;
};