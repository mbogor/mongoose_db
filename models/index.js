var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

var PageSchema = new Schema({
  title:  {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content:   {type: String, required: true},
  status: {type: String, enum: ['open', 'closed']},
  date: { type: Date, default: Date.now },
  urlTitle: {type: String, required: true}
});
var Page = mongoose.model('Page', PageSchema);

PageSchema.virtual('urlRoute').get(function () {
  return '/wiki/' + this.urlTitle;
});

var UserSchema = new Schema({
  name:  {type: String, required: true},
  email: {type: String, required: true, unique:true}
});
var User = mongoose.model('User', UserSchema);

module.exports = {
  Page: Page,
  User: User
};