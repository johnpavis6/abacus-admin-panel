module.exports.tech=(req,res,next)=>{
	if(req.session.role=='tech'){
		next();
		return;
	}
	if(req.method=='GET')
		res.redirect('/admin');
	else
		res.send({code:0,message:'Session Expired'});
}
module.exports.non_tech=(req,res,next)=>{
	if(req.session.role=='non-tech'){
		next();
		return;
	}
	if(req.method=='GET')
		res.redirect('/admin');
	else
		res.send({code:0,message:'Session Expired'});
}
module.exports.workshop=(req,res,next)=>{
	if(req.session.role=='workshop'){
		next();
		return;
	}
	if(req.method=='GET')
		res.redirect('/admin');
	else
		res.send({code:0,message:'Session Expired'});
}