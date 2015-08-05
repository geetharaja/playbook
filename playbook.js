var Schema = mongoose.Schema;
var ItemSchema = new Schema ({
		name : {type : String , index : {unique : true } },
		category : {type : String},
		created_at : {type : Date},
		updated_at : {type : Date},
		creator    : {type : String}
});

module.exports = db.model('playbook',ItemSchema);
		
