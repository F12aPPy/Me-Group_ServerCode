module.exports = (sequelize, DataTypes) => {
    let Role = sequelize.define("Role", {
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
        role_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role_detail: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      }, {tableName: 'Role'});

    return Role;
};