services = {
	'volcano' : {
		'name' : 'Volcano Insurance',
		'flow' : 'Volcano Insurance'
	},
	
	'earthquake': {
		'name' : 'Earthquake Insurance',
		'flow' : 'Earthquake Insurance'
	},
	
	'tsunami': {
		'name' : 'Tsunami Insurance',
		'flow' : 'Tsunami Insurance'
	},
	
	'insolvency' : {
		'flow' : 'Online Debt Service - Application Fee',
		'name' : 'Online Debt Service',
		'hide_directdebit' : true,
		'hide_paypal' : true
	},

	'blue-badge' : {
		'flow' : 'Blue Badge Application',
		'name' : 'Blue Badge Application',
		'hide_directdebit' : true,
		'hide_paypal' : true
	}
}



module.exports.filter = function(req, res, next) {
	if ('service' in req.body) {
       	var service = req.body['service']
		if (service in services) {
			for (key in services[service]) {
				console.log(key + " => " + services[service][key])
				res.cookie(key, services[service][key]);
			}
		} 
    }
		
	next();
}




module.exports.landing = function(presenters, req, res) {
	var service = req.query['service'];
	if (service in services) {
		for (key in services[service]) {
			console.log(key + " => " + services[service][key])
			res.cookie(key, services[service][key]);
		}
		
		for (key in req.query) {
			if ('key' != service) {
		        var raw_value = req.query[key];
		        var value = presenters[key] ? presenters[key](raw_value) : raw_value;
				console.log(key + " => " + value)
				res.cookie(key, value);
			}
		}
		
		return true;
	}
	else {
		return false;
	}
}