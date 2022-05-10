const mongoose = require('mongoose');


const reviewSchema =  mongoose.Schema ({
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        require: true,
    }

}, {
    timestamps: true
})

const productsSchema =  mongoose.Schema ({

    name: {
        type: String,
        required: true,
    },
    imgurl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

    reviews : [reviewSchema]

}, {
    timestamps: true
});

const Product = mongoose.model('products', productsSchema )
module.exports = Product