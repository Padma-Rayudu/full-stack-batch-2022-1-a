'use strict';
const {
  Model
} = require('sequelize');
const expense = require('./expense');
const group = require('./group');
module.exports = (sequelize, DataTypes) => {
  class Userdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Friend,Expense,Group}) {
      // define association here
      this.hasMany(Friend,{foreignKey:"userid"})
      this.hasMany(Expense,{foreignKey:"createdby"})
      this.hasMany(Group,{foreignKey:"createdby"})
    }
  }
  Userdetail.init({
    fullname:
    {
      type: DataTypes.STRING,
      allowNull:false
    },

    email:  {
      type: DataTypes.STRING,
      allowNull:false
    },
    phone: 
    {
      type: DataTypes.TEXT,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:"userdetails",
    modelName: 'Userdetail',
  });
  return Userdetail;
};