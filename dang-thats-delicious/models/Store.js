const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true, //trims any extra white space, ex: "My     Store"
        required: 'Please enter a store name!',
    },
    slug: String,
    description: {
        type: String,
        trim: true,
    },
    tags: [String]
});

storeSchema.pre('save', function(next){
    if(!this.isModified('name')) { //if we're not modifying the name (i.e. it's first time submitting it), then move on.
        next(); // skip it
        return;
    }

    this.slug = slug(this.name);
    next();
    //TODO: make more resilient so that slugs are unique.
});

module.exports = mongoose.model('Store', storeSchema);