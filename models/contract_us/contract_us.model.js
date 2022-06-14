module.exports = (sequelize, DataTypes) => {
    let ContractUs = sequelize.define("ContractUs", {
        createdAt: {
          type: "TIMESTAMP",
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
        enterprise_phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enterprise_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        enterprise_servicetime: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        enterprise_GG_key_api: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enterprise_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        enterprise_facebook: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enterprise_latitude: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        enterprise_longtitude: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      }, {tableName: 'ContractUs'});

    return ContractUs
};
