module.exports = (sequelize, DataTypes) => {
    let User_log = sequelize.define("User_log", {
        log_id: {
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
            type: DataTypes.DATE,
            allowNull: true,
            field: "updated_at",
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "deleted_at",
        },
        log_detail: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      }, {tableName: 'User_log'});

    return User_log;
};