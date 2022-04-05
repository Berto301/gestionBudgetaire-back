const mongoose = require ( "mongoose" );
const expenseSchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    realValue: {
        type: Number
    },
    predictiveValue: {
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
    transactionNumber:{
        type: Number
    }
}, { timestamps: true });
const Expense = mongoose.model ( "Expense", expenseSchema );
module.exports = Expense;