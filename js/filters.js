
angular.module('codeblockFilters', []).filter('splitTags', function () {
    return function (input) {
        var arrStr = input.split(',');
        var returnStr = "";
        for (var i = 0; i < arrStr.length; i++) {
            returnStr = returnStr + "<code ng-click='filterByTag('"+arrStr[i]+"')'>" + arrStr[i] + "</code>";
        }
        return returnStr;
    };
})



