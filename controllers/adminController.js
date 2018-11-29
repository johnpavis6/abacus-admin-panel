module.exports.login=(req,res)=>{
	var section=req.body.section,key=req.body.key;
	if((section=='tech'&&key=='tech')||(section=='non-tech'&&key=='non-tech')||(section=='workshop' && key=='workshop')){
		req.session.role=section;
		res.send({code:0});
	}else{
		res.send({code:1});
	}
}
module.exports.logout=(req,res)=>{
	req.session.role=null;
	res.redirect('/admin');
}
module.exports.tech=(req,res)=>{
	res.render('dashboard',{
		data:{
			'section':'Technical',
			'section_code':'tech',
			'include':'tech_and_non_tech',
		}
	})
}
module.exports.non_tech=(req,res)=>{
	res.render('dashboard',{
		data:{
			'section':'Non Technical',
			'section_code':'non-tech',
			'include':'tech_and_non_tech',
		}
	})
}
module.exports.workshop=(req,res)=>{
	res.render('dashboard',{
		data:{
			'section':'Workshop',
			'section_code':'workshop',
			'include':'workshop',
		}
	})
}
module.exports.techs=(req,res)=>{
	var techs=require('../model').techs;
	techs.find({}).toArray((err,result)=>{
		res.send({events:result||[]});
	})
}
module.exports.non_techs=(req,res)=>{
	var non_techs=require('../model').non_techs;
	non_techs.find({}).toArray((err,result)=>{
		res.send({events:result||[]});
	})
}
module.exports.workshops=(req,res)=>{
	var workshops=require('../model').workshops;
	workshops.find({}).toArray((err,result)=>{
		res.send({events:result||[]});
	})
}
module.exports.tech_save=(req,res)=>{
	var techs=require('../model').techs,ObjectID=require('../model').ObjectID;
	var data={
		name:req.body.name,
		description:req.body.description,
		time:req.body.time,
		venue:req.body.venue,
		rules:req.body.rules,
		price_money:req.body.price_money,
	}
	if(req.body._id==""){
		techs.insertOne(data,(err,result)=>{
			res.send({code:1,message:'Created Successfully'});
		});
	}else{
		techs.findOneAndUpdate({_id:ObjectID(req.body._id)},{$set:data},(err,result)=>{
			res.send({code:1,message:'Saved Successfully'});
		});
	}
}
module.exports.non_tech_save=(req,res)=>{
	var non_techs=require('../model').non_techs,ObjectID=require('../model').ObjectID;
	var data={
		name:req.body.name,
		description:req.body.description,
		time:req.body.time,
		venue:req.body.venue,
		rules:req.body.rules,
		price_money:req.body.price_money,
	}
	if(req.body._id==""){
		non_techs.insertOne(data,(err,result)=>{
			res.send({code:1,message:'Created Successfully'});
		});
	}else{
		non_techs.findOneAndUpdate({_id:ObjectID(req.body._id)},{$set:data},(err,result)=>{
			res.send({code:1,message:'Saved Successfully'});
		});
	}
}
module.exports.workshop_save=(req,res)=>{
	var workshops=require('../model').workshops,ObjectID=require('../model').ObjectID;
	var data={
		name:req.body.name,
		description:req.body.description,
		time:req.body.time,
		venue:req.body.venue,
	}
	if(req.body._id==""){
		workshops.insertOne(data,(err,result)=>{
			res.send({code:1,message:'Created Successfully'});
		});
	}else{
		workshops.findOneAndUpdate({_id:ObjectID(req.body._id)},{$set:data},(err,result)=>{
			res.send({code:1,message:'Saved Successfully'});
		});
	}
}
module.exports.tech_remove=(req,res)=>{
	var techs=require('../model').techs,ObjectID=require('../model').ObjectID;
	techs.deleteOne({_id:ObjectID(req.body._id)});
	res.send({code:1,message:'Deleted Successfully'});
}
module.exports.non_tech_remove=(req,res)=>{
	var non_techs=require('../model').non_techs,ObjectID=require('../model').ObjectID;
	non_techs.deleteOne({_id:ObjectID(req.body._id)});
	res.send({code:1,message:'Deleted Successfully'});
}
module.exports.workshop_remove=(req,res)=>{
	var workshops=require('../model').workshops,ObjectID=require('../model').ObjectID;
	workshops.deleteOne({_id:ObjectID(req.body._id)});
	res.send({code:1,message:'Deleted Successfully'});
}