var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.getEmployee = getEmployee;
exports.getEmployees = getEmployees;

function getEmployees(callback) {
	Employee.find().sort('name.last').exec(callback);
}

function getEmployee(employeeID, callback) {
	Employee.findOne({
		id: employeeID
	}).populate('team').exec(callback);
}