const mongoose = require ( "mongoose" );

const Schema = mongoose.Schema;
const expenseSchema = new Schema ( {
    name:{
        type: String
    },
    icon:{
        type: String
    },
    color:{
        type: String
    },
    description:{
        type:String
    },
    estimation:{
        type:Number
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
}, { timestamps: true });
const Expense = mongoose.model ( "Expense", expenseSchema );
module.exports = Expense;