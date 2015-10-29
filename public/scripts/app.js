var app = angular.module("app", ["ngRoute", "ngResource", "angularFileUpload"])

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

.controller('CreateCtrl', ['$scope', 'Imovels', 'FileUploader', function ($scope, Imovels, FileUploader) {
	console.log("HomeCtrl");

	var uploader = $scope.uploader = new FileUploader({
      url: 'upload.php'
  });

  // FILTERS

  uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

  console.info('uploader', uploader);




	
	$scope.listaFotos = [];
	$scope.addFoto = function() {
		var nome = "foto_" + $scope.listaFotos.length;
		$scope.listaFotos.push({name : nome, model : "fotos"});
	};

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

	$scope.submit = function(imovels) 
	{
		console.log(imovels);
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