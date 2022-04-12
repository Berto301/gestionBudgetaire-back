const mongoose = require ( "mongoose" );

const Schema = mongoose.Schema;
const expenseSchema = new Schema ( {
    name:{
        type: String
    },
    realValue: {
        type: Number
    },
    date:{
        type: Date
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
    transactionNumber:{
        type: Number
    },
    estimation:{
        type:Number
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    societyId:{
      type: Schema.Types.ObjectId,
      ref: "Society"
    }
}, { timestamps: true });
const Expense = mongoose.model ( "Expense", expenseSchema );
module.exports = Expense;