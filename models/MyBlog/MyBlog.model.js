module.exports = (sequelize, DataTypes) => {
    let MyBlog = sequelize.define("MyBlog", {
        MyBlog_id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
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
        employee_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        link_address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      }, {tableName: 'MyBlog'});

    return MyBlog;
};