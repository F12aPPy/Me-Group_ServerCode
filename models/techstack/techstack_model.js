module.exports = (sequelize, DataTypes) => {
    let Techstack = sequelize.define("Techstack", {
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
        techstack_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        techstack_img: {
          type: DataTypes.TEXT,
          // allowNull: false,
        },
      }, {tableName: 'Techstack'});

    return Techstack;
};