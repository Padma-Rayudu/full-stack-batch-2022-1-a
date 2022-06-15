'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Userdetail}) {
      // define association here
       this.belongsTo(Userdetail,{foreignKey:'userid'})
    }
  }
  Friend.init({
    userid:{
      type:DataTypes.INTEGER,
      allowNull:null
    } ,
    friendid:{
        type:DataTypes.INTEGER,
        allowNull:null
    } 
  }, {
    sequelize,
    tableName:"friends",
    modelName: 'Friend',
  });
  return Friend;
};