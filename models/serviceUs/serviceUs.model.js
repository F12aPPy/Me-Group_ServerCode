module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define("ServiceUs", {
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
        serviceUs_name: {
          type: DataTypes.STRING(255),
          // allowNull: false,
        },
        serviceUs_detail: {
          type: DataTypes.TEXT,
          // allowNull: false,
        },
        serviceUs_img: {
          type: DataTypes.TEXT,
          // allowNull: false,
        },
      }, {tableName: 'ServiceUs'});

    return Service;
};