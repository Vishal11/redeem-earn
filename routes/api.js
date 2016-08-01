var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var UserEarnings=mongoose.model('UserEarning')

router.use(function(req,res,next){

	if (req.method=="GET"){
		return next();
	}

	// if(!req.isAuthenticated()){
	// 	return res.redirect('/#login');
	// }
	return next();
})

router.route('/earnings').get(function(req,res){
	UserEarnings.find(function(err,data){
		if(err){
			res.send(500,err)
		}
		res.send(200,data);
	})
})
.post(function(req,res){	
	var earnings=new UserEarnings();
	earnings.userId=req.body.userId;
	earnings.earnings=req.body.earnings;

	earnings.save(function(err,obj){
		if(err){
			res.send(500,err);
		}
		res.send(200,'earnings updated:'+obj.earnings);
	})
});

router.route('/earnings/:id')
.get(function(req,res){
	UserEarnings.findOne({userId:req.params.id},function(err,earnings){
		if(err){
			res.status(500).send(err)
		}
		//earnings.earnings=earnings.earnings+req.body.earnings;
		res.json(earnings)
		
	})
})
.put(function(req,res){
	UserEarnings.findOne({userId:req.params.id},function(err,obj){
		if(err){
			res.status(500).send(err)
		}

		if (obj){
		 obj.earnings=parseInt(obj.earnings)+parseInt(req.body.earnings);
		
		// res.json(obj)
		obj.save(function(err,data){
			if(err){
				res.status(500).send(err)
			}
			res.json(data);
		})
	}
	else{
		res.send(500,"User doesnot exist");
	}
	})
});


router.route('/redeem/:id')
.put(function(req,res){
	UserEarnings.findOne({userId:req.params.id},function(err,data){
		if(err){
			res.send(500,err)
		}
		if(data){
			data.earnings=parseInt(data.earnings)-parseInt(req.body.earnings);
			if(data.earnings<0){
				res.json({token:"Cannot redeem as you dont have enough balance"});
			}
			else{
				data.save(function(err,data){
					if(err){
						res.send(500,err);
					}
					res.send(data);
				})
			}
		}
		else{
			res.send(500,"User doesnot exist")
		}
	})
})
module.exports=router;