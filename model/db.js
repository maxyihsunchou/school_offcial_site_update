var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost/school_offcial_site');

var mongoSchema =   mongoose.Schema;
// create schema
var articleSchema  = {
    "articleContent" : String,
    "articleDepartment" : String
};
// create model if not exists.
module.exports = mongoose.model('articleAdd',articleSchema);
