
angular.module('codeblockFilters', []).filter('splitTags', function () {
    return function (input) {
        var arrStr = input.split(',');
        var returnStr = "";
        for (var i = 0; i < arrStr.length; i++) {
            returnStr = returnStr + "<code ng-click='filterByTag(&#39;"+arrStr[i]+"&#39;)'>" + arrStr[i] + "</code>";
        }
        return returnStr;
    };
})



