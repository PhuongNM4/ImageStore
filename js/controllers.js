
angular.module('codeblockControllers', [])

.controller('ListCTRL', function ($scope, CodeblocksFactory, rootUrl) {
    $scope.blocks = CodeblocksFactory.getData(rootUrl);
})

//CreateController
.controller('CreateCTRL', function ($scope, $location, $timeout, CodeblocksFactory, rootUrl) {
    $scope.addMode = true;

    debugger

    $scope.saveBlock = function () {
        $scope.block.time = GetDateTimeNow();

        CodeblocksFactory.getData(rootUrl).$add($scope.block, function () {
            $timeout(function () {
                $location.path('/');
            });
        });
    };
})

//EditController
.controller('ViewCTRL', function ($scope, $location, $routeParams, CodeblocksFactory, rootUrl) {
    rootUrl = rootUrl + $routeParams.blockId;
    $scope.block = CodeblocksFactory.getData(rootUrl);

    $scope.destroy = function () {
        $scope.block.$remove();
        $location.path('/');
    };

    $scope.saveBlock = function () {
        $scope.block.$save();
        $location.path('/');
    };
});

