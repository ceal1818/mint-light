var rdl = {
	resource: '/users'
	routes: [
		'/' : [
			{
				method: 'get',
				controller: 'list',
				service: 'list'
			},
			{
				method: 'post',
				controller: 'create',
				service: 'create'
			}			
		],
		'/:id': [
			{
				method: 'get',
				controller: 'get',
				service: 'get'
			},
			{
				method: 'put',
				controller: 'update',
				service: 'update'
			},
			{
				method: 'delete',
				controller: 'delete',
				service: 'delete'
			}
		]
	]
};