module.exports = (sequelize, DataTypes) => {
    let Goal = sequelize.define("Goal", {
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
        goal_title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        goal_detail: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        goal_img: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        service_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        }
      }, {tableName: 'Goal'}); 

    return Goal;
};