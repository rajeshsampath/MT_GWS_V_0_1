/**
 *	Helper Uitlity
 *	Fahid Mohammad http://fahidmohammad.in
 *
 */
//Includes
const config = require('config');
const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// ========================================================================
//  Source Helper Utility Module
// ========================================================================
var HelperUtil = {

	//  Version Definiation
	VERSION: config.get('versions.helper'),

	//Parse to JSON using lodash
	_parseJson: function(data) {
		return _.attempt(JSON.parse.bind(null, data));
	},

	/**
	 *@description Write Log Files
	 *@params String
	 *@params Array
	 *@return Boolean
	 *@author Fahid Mohammad
	 *@date 15/12/2015 13:10
	 */
	logWriter: function(data, filename, folderName, append) {
		if (typeof data === 'object') {
			data = JSON.stringify(data);
		}
		logPath = this.createLogFolder(folderName);
		var currentDate = moment().format('DD-MM-YYYY');
		logPath = logPath + filename + '.log';
		if (append) {
			var newData = "\n" + data;
			fs.appendFile(logPath, newData);
		} else {
			fs.writeFileSync(logPath, data);
		}
	},

	createLogFolder: function createLogFolder(folderName) {
		var currentDate = moment().format('DD-MM-YYYY');
		var logPathDir = path.join(__dirname, '../../../Amadeus_API_LOG');
		if (!fs.existsSync(logPathDir)) {
			fs.mkdirSync(logPathDir);
		}
		logPathDir = path.join(logPathDir + '/' + currentDate);
		if (!fs.existsSync(logPathDir)) {
			fs.mkdirSync(logPathDir);
		}
		logPathDir = path.join(logPathDir + '/' + folderName);
		if (!fs.existsSync(logPathDir)) {
			fs.mkdirSync(logPathDir);
		}
		return logPathDir + "/";
	}
}

module.exports = HelperUtil;