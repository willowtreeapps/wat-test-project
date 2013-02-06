function ArticlesCtrl($scope, $http) {
    
    $scope.trashcount = 0;
    $scope.trashlist = [];
    
    $http.get('json/posts.json').
        success(function(data, status, headers, config) {
            $scope.articles = data;
            _.each($scope.articles, function(article) {
                article.visible = false;
            });
        }).
        error(function(data, status, headers, config) {
            console.log('error fetching posts.json');
        });
            
    $scope.removeArticle = function(article) {
        
        var articles = $scope.articles;
        $scope.articles = [];
            
        _.each(articles, function(a) {
            if (article.id != a.id) {
                $scope.articles.push(a);
            }
        });
        
        $scope.trashcount++;
        $scope.trashlist.push(article);
    };

    $scope.restoreTrash = function() {

        _.each($scope.trashlist, function(item) {
            $scope.articles.push(item);
        });
        
        $scope.trashcount = 0;
    };
    
    $scope.doSearch = function() {
        
        var search = $scope.search;
        
        var articles = $scope.articles;
        $scope.articles = [];
        
        _.each(articles, function(article) {
            if (article.text.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                $scope.articles.push(article);
            }
        });
    };
}

function ArticleCtrl($scope, $http) {
        
    $scope.showArticle = function(articleId) {

        $http.get('json/posts/' + articleId + '.json').
            success(function(data, status, headers, config) {
                $scope.description = data.description;
            }).
            error(function(data, status, headers, config) {
                console.log('error fetching posts.json');
            });    
    };
}