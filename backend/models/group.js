'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.GroupMember,{foreignKey:"groupid"})
      this.belongsTo(models.Userdetail,{foreignKey:"createdby"})
    }
  }
  Group.init({
    createdby: {
      type:DataTypes.INTEGER,
      allowNull:false
    },

    name:{
      type:DataTypes.STRING,
      allowNull:false
     } 
  }, {
    sequelize,
    tableName:'groups',
    modelName: 'Group',
  });
  return Group;
};