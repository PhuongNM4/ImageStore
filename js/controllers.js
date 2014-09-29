
angular.module('codeblockControllers', [])

    // ListController
    .controller('ListCTRL', function ($scope, CodeblocksFactory, rootUrl) {
        var maxSize = 0;
        var firstTake = 10;
        var addOffset = 5;
        var currentSize = 0;

        $scope.blocks = [];
        $scope.loading = true;

        buffer = CodeblocksFactory.syncAllAsArray(rootUrl);
        buffer.$loaded().then(function () {
            $scope.loading = false;
            maxSize = buffer.length;
            for (var i = maxSize; i > maxSize - firstTake; i--) {
                $scope.blocks.push(buffer[i - 1]);
            }
        });

        $scope.loadMore = function () {
            currentSize = $scope.blocks.length;
            var startIndex = maxSize - currentSize;
            var endIndex = startIndex - addOffset;

            for (var i = startIndex; i > endIndex && i > 0; i--) {
                $scope.blocks.push(buffer[i - 1]);
            }
        };

        $scope.filterByTag = function (tagName) {
            $scope.query = tagName;
        };

        $scope.resetFilter = function () {
            $scope.query = '';
        }
    })

    //CreateController
    .controller('CreateCTRL', function ($scope, $location, $timeout, CodeblocksFactory, rootUrl) {
        $scope.addMode = true;
        buffer = CodeblocksFactory.syncAllAsArray(rootUrl);

        $scope.saveBlock = function () {
            $scope.block.time = GetDateTimeNow();

            buffer.$add($scope.block).then(function () {
                $location.path('/');
            });
        };
    })

    //EditController
    .controller('ViewCTRL', function ($scope, $location, $routeParams, CodeblocksFactory, CommentFactory, rootUrl) {
        rootUrl = rootUrl + $routeParams.blockId;

        $scope.editMode = false;
        $scope.showComment = false;
        $scope.block = CodeblocksFactory.syncObject(rootUrl, 1);
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
            $scope.block.$save().then(function () {
                $location.path('/');
            })
        };

        $scope.addComment = function () {
            $scope.comments.$add($scope.newCmt);
            $scope.newCmt.content = "";
            $scope.showComment = false;
        }
    });

