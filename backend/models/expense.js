'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Userdetail,{foreignKey:"createdby"})
      this.hasMany(models.ExpenseMember,{foreignKey:"expenseid"})
    }
  }
  Expense.init({
    description:
    {  type:DataTypes.STRING,
       allowNull:true
     } ,
    createdby:
    {  type: DataTypes.INTEGER,
        allowNull:false
      },
    amount:
    { type: DataTypes.INTEGER,
      allowNull:false
    }

  }, {
    sequelize,
    tableName:"expenses",
    modelName: 'Expense',
  });
  return Expense;
};