
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
      type: 'TIMESTAMP',
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

  let Employee = sequelize.define("Employee", {
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
      type: "TIMESTAMP",
      allowNull: true,
      timestamps: false,
      field: "deleted_at",
    },
    employee_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    employee_detail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    instargram: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,   
  }, {tableName: 'Employee'});

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
      type: "TIMESTAMP",
      allowNull: true,
      field: "deleted_at",
    },
    service_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    serviece_detail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    service_img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {tableName: 'Service'});

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
      type: "TIMESTAMP",
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
  }, {tableName: 'Goal'});  

  return {
    Enterprise,
    Employee,
    Service,
    Goal
  };
};
