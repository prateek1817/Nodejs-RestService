var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');


var data = {
	employees:[
	{
		id: 100,
		name: {
			first: 'jagadeesh',
			last: 'sharma'
		},
		image: '/images/employees/100.png',
		address: {
			lines: ['opp s l residency'],
			city: 'Hyderabad',
			state: 'TG',
			zip: 500050
		}
	},
	{
		id: 101,
		name: {
			first: 'jagadeesh',
			last: 'marthy'
		},
		image: '/images/employees/101.png',
		address: {
			lines: ['opp s l residency'],
			city: 'Bangalore',
			state: 'KAR',
			zip: 56001
		}
	},
	{
		id: 102,
		name: {
			first: 'jagadeesh',
			last: 'shekar'
		},
		image: '/images/employees/102.png',
		address: {
			lines: ['Balaji Towers'],
			city: 'Piduguralla',
			state: 'AP',
			zip: 522413
		}
	},
	{
		id: 103,
		name: {
			first: 'rahul',
			last: 'sharma'
		},
		image: '/images/employees/103.png',
		address: {
			lines: ['Golden Temple'],
			city: 'Amritsar',
			state: 'Punjab',
			zip: 520001
		}
	},
	{
		id: 104,
		name: {
			first: 'Charan',
			last: 'A'
		},
		image: '/images/employees/104.png',
		address: {
			lines: ['Nizampet'],
			city: 'Hyderabad',
			state: 'TG',
			zip: 500023
		}
	},
	{
		id: 105,
		name: {
			first: 'chaitanya',
			last: 'K'
		},
		image: '/images/employees/105.png',
		address: {
			lines: ['KPHB'],
			city: 'Hyderabad',
			state: 'TG',
			zip: 500037
		}
	}
	],
	teams: [
	{
		name: 'Software and services group'
	},
	{
		name: 'Project Development'
	}
	]
};


var deleteEmployees = function(callback) {
console.info('Deleting Employees');
Employee.remove({}, function(error, response) {
	if(error) {
		console.error('Error deleting employees:' +error);
	}
	console.info('done deleting employees');
	callback();
});
};

var addEmployees = function(callback) {
console.info('Adding Employees');
Employee.create(data.employees, function(error) {
	if(error) {
		console.error('Error Adding employees:' +error);
	}
	console.info('done Adding employees');
	callback();
});
};

var deleteTeams = function(callback) {
console.info('Deleting Teams');
Team.remove({}, function(error, response) {
	if(error) {
		console.error('Error deleting teams:' +error);
	}
	console.info('done deleting teams');
	callback();
});
};

var addTeams = function(callback) {
console.info('Adding Teams');
Team.create(data.Teams, function(error, team1) {
	if(error) {
		console.error('Error Adding teams:' +error);
	} else {
		data.team_id = team1._id;
	}
	console.info('done Adding teams');
	callback();
});
};

var updateEmployeeTeams = function(callback) {
	console.info('updating employee teams');
	var team = data.teams[0];


	//set every one to be on the same team to start
	Employee.update({}, {
		team: data.team_id
	},{
		multi: true
	}, function(error, numberAffected, response) {
		if(error) {
			console.error('error updating employee team:' + error);
		}
		console.info('Done updating employee teams');
		callback();
	});
};


async.series([
	deleteEmployees,
	deleteTeams,
	addEmployees,
	addTeams,
	updateEmployeeTeams
	], function(error, results) {
		if(error) {
			console.error('Error', + error);
		}

		mongoose.connection.close();
		console.log('Done');
	});