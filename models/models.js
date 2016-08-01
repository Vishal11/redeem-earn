var mongoose=require('mongoose');

var userEarningSchema=new mongoose.Schema({
	userId:String,
	// age:Number,
	earnings:Number
});

mongoose.model('UserEarning',userEarningSchema);