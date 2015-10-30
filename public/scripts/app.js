var app = angular.module("app", ["ngRoute", "ngResource"])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl: 'templates/list.html',
		controller: 'HomeCtrl'
	})
	.when('/edit/:id', {
		templateUrl: 'templates/edit.html',
		controller: 'EditCtrl'
	})
	.when('/create', {
		templateUrl: 'templates/create.html',
		controller: 'CreateCtrl'
	})
	.otherwise({ redirectTo: '/home' });

}])

.controller('HomeCtrl', ['$scope', 'Imovels', function ($scope, Imovels) {
	console.log("HomeCtrl")
	Imovels.get(function(data){
		console.log(data)
		$scope.imovels = data.imovels;
	})
}])

.controller('EditCtrl',  ['$scope', function ($scope) {
	$scope.settings = {
		pageTitle: "Editar Imóvel",
		action: "Edit"
	}
}])

.controller('CreateCtrl', ['$scope', 'Imovels', 'Caracteristicas', function ($scope, Imovels, Caracteristicas) {
	console.log("HomeCtrl");

	$scope.settings = {
		pageTitle: "Crear Imóvel",
		action: "Crear Imóvel"
	}

	$scope.imovel = {
		tipo_de_imovel: "",
		negocio: "",
		cidade: "",
		bairro: "",
		valor: "",
		area: "",
		descricao: "",
		status: ""
	};

	$scope.caracteristicas = {
		1 : "", 
		2 : "",            
		3 : "",
		4 : "",
		5 : "",
		6 : "",
		7 : "",
		8 : ""
	};

	$scope.submit = function(imovels, caracteristicas) 
	{
		console.log(imovels);
		console.log(caracteristicas);






		Imovels.save(imovels).$promise.then(function(data)
		{
			if(data.msg)
			{
				//angular.copy({}, $scope.imovel);
				$scope.settings.success = "Imóvel creado de jeito certo";
			}
		});
	}

}])

.service('Imovels', ['$resource', function ($resource) {
	return $resource("http://localhost:8099/restAPP/public/api/imovels/:id", {id: "@_id"}, {
			update: {method: "PUT", params: {id: "@id"}}
	});	
}])

.service('Caracteristicas', ['$resource', function ($resource) {
	return $resource("http://localhost:8099/restAPP/public/api/imovels/:id", {id: "@_id"}, {
			update: {method: "PUT", params: {id: "@id"}}
	});	
}])