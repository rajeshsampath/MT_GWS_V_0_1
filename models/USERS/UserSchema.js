/**
 *@author Fahid Mohammad
 *
 */
var mongoose = require('mongoose'),
	types = rootRequire('lib/Types');

var Schema = mongoose.Schema;

var schema = new Schema({
	FIRST_NAME: {
		type: String,
		required: true,
		unique: true
	},
	MIDDLE_NAME: {
		type: String,
	},
	LAST_NAME: {
		type: String,
		required: true,
		unique: true
	},
	EMAIL: {
		type: String,
		required: true,
		unique: true
	},
	DATE_OF_BIRTH: {
		type: String,
		required: true
	},
	PASSWORD: {
		type: String,
		required: true
	},
	PHONE_NUMBER: {
		type: Number,
		required: true,
		unique: true
	},
	AREA_CODE: {
		type: String,
		required: true,
	},
	GENDER: {
		type: String
	},
	DISPLAY_NAME: {
		type: String,
		required: true
	},
	ROLE: {
		type: Number,
		required: true
	},
	CREATED_DATE: {
		type: Date,
		default: Date.now
	},
	CREATED_BY: {
		type: String
	},
	MODIFIED_DATE: {
		type: Date,
		default: Date.now
	},
	MODIFIED_BY: {
		type: String
	},
	COMPANY_ID: {
		type: String
	}

}, {
	autoIndex: false,
	versionKey: false
});

schema.statics.addUser = function(query, cb){
	let _SELF = this;
	let user = new _SELF({
		USER_UNIQUIE_ID:'6325473',
		FIRST_NAME: query.firstName,
		MIDDLE_NAME: query.middleName || '',
		LAST_NAME: query.lastName,
		EMAIL: query.email,
		PHONE_NUMBER: query.phoneNumber,
		AREA_CODE: query.areaCode,
		GENDER: query.gender || '',
		DISPLAY_NAME: query.displayName,
		ROLE: query.role,
		CREATED_BY: 'rajes@maharahtravel.com',
		MODIFIED_BY: 'rajesh@maharahtravel.com',
		COMPANY_ID: '101',
		DATE_OF_BIRTH: query.dob,
		PASSWORD: query.passWord
	});

	user.save(function(err){
		console.log('err',err);
		if(!err) return cb(null, {status: types.SUCCESS});
		return cb({status: types.ERROR}, null)
	});

}
module.exports = mongoose.model("USER_SCHEMA", schema, 'USER_SCHEMA');