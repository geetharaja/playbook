var list = require('./playbook.js');
var  Q =require('q');

exports.index = function(req, res) {
  list.find({},function(err, Details) {
    if (err) {
      console.log(err);
      return err; 
    }
    res.send(Details);
    res.end();
  })
}


exports.create = function(req, res) {
console.log(req.body.playBookName + "   "+ req.body.categoryName)
list.create({
    name: req.body.playBookName,
    category : req.body.categoryName,
	created_at : Date.now(),
	updated_at : Date.now(),
	creator    : req.body.creator
  }, function(err, Details) {
    if (err) {
      console.log(err);
      return err; 
    }
    res.send(Details);
    res.end();
  }).on('error', function(err){
    res.send({error:"Error in saving emp details"});
    res.end();
  });
}

exports.update = function(req, res, next) {
  console.log("Id to be udpated   " + req.params.id);


  list.findById(req.params.id, function(err, Details) {

      Details['name'] = req.body.name;
      Details['category'] = req.body.category;
	  Details['created_at'] = req.body.created_at;
	  Details['updated_at'] = new Date();
	  Details['creator'] = req.body.creator;
      

      Details.save(function(err) {
          if (err) throw err;
          console.log('Details successfully updated!');
          res.send({ message : 'Success!'});
          res.end();          
      });

  })



};


exports.show = function(req, res) {
  list.findById(req.params.id, function(err, Details) {
    if (err) return console.log(err);
    res.send(Details);
    res.end();
  })
}

exports.delete = function(req, res) {
  list.findById(req.params.id, function(err, Details) {
    console.log(Details._id)
    if (err) {
      return err;
    }

    Q.ninvoke(list.remove({"_id":Details._id}),'exec');
    res.send('Details deleted');
    res.end();
  });
}








