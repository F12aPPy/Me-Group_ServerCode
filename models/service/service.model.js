module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define("Service", {
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
        service_name: {
          type: DataTypes.STRING(255),
          // allowNull: false,
        },
        service_detail: {
          type: DataTypes.TEXT,
          // allowNull: false
        },
        service_img: {
          type: DataTypes.TEXT,
          // allowNull: false,
        },
      }, {tableName: 'Service'});

    return Service;
};