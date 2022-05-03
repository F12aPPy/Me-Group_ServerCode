module.exports = (sequelize, DataTypes) => {
    let AboutUs = sequelize.define("AboutUs", {
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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        enterprise_surname: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        enterprise_detail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enterprise_phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        enterprise_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        // enterprise_img: {
        //   type: DataTypes.TEXT,
        //   allowNull: true,
        // },
      }, {tableName: 'AboutUs'});

    return AboutUs
};
