const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
    {
        opinion: String,
        rate: { type: Number, min: 1, max: 5 },
        from: {type: Schema.Types.ObjectId, ref:"User"},
        to: {type: Schema.Types.ObjectId, ref:"User"},
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

const Rate = mongoose.model("Rate", RateSchema);
module.exports = Rate;