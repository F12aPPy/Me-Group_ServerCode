module.exports = (sequelize, DataTypes) => {
    let User_admin = sequelize.define("User_admin", {
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
        Uadmin_username: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        Uadmin_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        Uadmin_firstname: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        Uadmin_lastname: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {tableName: 'User_admin'});

    return User_admin;
};