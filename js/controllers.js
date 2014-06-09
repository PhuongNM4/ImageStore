
angular.module('codeblockControllers', [])

.controller('ListCTRL', function ($scope, $location, $anchorScroll, CodeblocksFactory, rootUrl) {
    $scope.blocks = CodeblocksFactory.getData(rootUrl);

    $scope.filterByTag = function (tagName) {
        $scope.query = tagName;
        $location.hash('top');
        $anchorScroll();
    };

    $scope.resetFilter = function () {
        $scope.query = '';
        $location.hash('top');
        $anchorScroll();
    }
})

    //CreateController
    .controller('CreateCTRL', function ($scope, $location, $timeout, CodeblocksFactory, rootUrl) {
        $scope.addMode = true;
        $scope.db = CodeblocksFactory.getData(rootUrl);

        $scope.saveBlock = function () {
            $scope.block.id = $scope.db.$getIndex().length + 1;
            $scope.block.time = GetDateTimeNow();

            $scope.db.$add($scope.block, function () {
                $timeout(function () {
                    $location.path('/');
                });
            });
        };
    })

    //EditController
    .controller('ViewCTRL', function ($scope, $location, $routeParams, CodeblocksFactory, CommentFactory, rootUrl) {
        rootUrl = rootUrl + $routeParams.blockId;

        $scope.editMode = false;
        $scope.showComment = false;
        $scope.block = CodeblocksFactory.getData(rootUrl);
        $scope.comments = CommentFactory.getComments(rootUrl);

        $scope.toggleEdit = function () {
            $scope.editMode = !$scope.editMode;
        };

        $scope.toggleComment = function () {
            $scope.showComment = !$scope.showComment;
        }

        $scope.destroy = function () {
            $scope.block.$remove();
            $location.path('/');
        };

        $scope.saveBlock = function () {
            $scope.block.$save();
            $location.path('/');
        };

        $scope.addComment = function () {
            $scope.comments.$add($scope.newCmt);
            $scope.newCmt.content = "";
        }
    });

