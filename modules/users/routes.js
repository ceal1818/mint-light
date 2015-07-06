var _ = require('underscore'),
	Module = require('../../core/module');

var UserModule = _.extend(
{

	module: 'users'

}, Module);

module.exports = UserModule.getRouter();