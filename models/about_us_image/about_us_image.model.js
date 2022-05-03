module.exports = (sequelize, DataTypes) => {
    let AboutUs = sequelize.define("AboutUs_Image", {
        aboutUs_Image_id : {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
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
        image_name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        aboutUs_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {tableName: 'AboutUs_Image'});

    return AboutUs
};
