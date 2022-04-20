module.exports = (sequelize, DataTypes) => {
    let Mbti = sequelize.define("Mbti", {
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
        mbti_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        mbti_detail: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      }, {tableName: 'Mbti'});

    return Mbti;
};