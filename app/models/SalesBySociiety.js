const mongoose = require ( "mongoose" );

const Schema = mongoose.Schema;
const salesBySocietySchema = new Schema ( {
    
    realValue: {
        type: Number
    },
    date:{
        type: Date
    },
    description:{
        type:String
    },
    transactionNumber:{
        type: Number
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    societyId:{
      type: Schema.Types.ObjectId,
      ref: "Society"
    },
    salesId:{
      type: Schema.Types.ObjectId,
      ref: "Expense"
    }
}, { timestamps: true });
const SalesBySociety = mongoose.model ( "SalesBySociety", salesBySocietySchema );
module.exports = SalesBySociety;