module.exports = (sequelize, DataTypes) => {
    let Enterprise = sequelize.define("Enterprise", {
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.fn('NOW'),
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: 'TIMESTAMP',
            defaultValue: sequelize.fn('NOW'),
            allowNull: false,
            field: 'updated_at'
        },
        deletedAt: {
          type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at'
        },
        enterprise_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        enterprise_detail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enterprise_phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        enterprise_nametax: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        enterprise_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
      }, {tableName: 'Enterprise'});

    return Enterprise
};
