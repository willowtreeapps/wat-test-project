"use strict";

describe('Controller tests', function() {

    describe("ArticlesCtrl", function() {
        
        var scope, ctrl, $httpBackend;
        
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('json/posts.json').respond([{ id: 1, date: '1/1/2013', text: 'some text', visible: false}]);
            scope = $rootScope.$new();
            ctrl = $controller(ArticlesCtrl, {$scope: scope});        
        }));
        
        it('Should fetch articles, which are mocked to return 1 record, and add a "visible" property to each', function() {     
            expect(scope.articles).toBeUndefined();
            $httpBackend.flush();
            expect(scope.articles).toEqual([{ id: 1, date: '1/1/2013', text: 'some text', visible: false}]);         
        });
        
        it('Should remove an article and add to the trash collection when removeArticle() is called', function() {
            var count = 0;
            
            expect(scope.articles).toBeUndefined();
            $httpBackend.flush();
            
            for (var article in scope.articles) {
                count++;
            }
            
            // we should have one article
            expect(count).toBe(1);
            
            //remove the only article
            scope.removeArticle(scope.articles[0]);
            
            // reset counts
            count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            // confirm trash was updated
            expect(count).toBe(0);
            expect(scope.trashcount).toBe(1);
            expect(scope.trashlist).toEqual([{ id: 1, date: '1/1/2013', text: 'some text', visible: false}]);  
        });
        
        it('Should move all articles from trash back to articles collection when restoreTrash() is called', function() {
            var count = 0;
            
            expect(scope.articles).toBeUndefined();
            $httpBackend.flush();
            
            for (var article in scope.articles) {
                count++;
            }
            
            // we should have one article
            expect(count).toBe(1);
            
            //remove the only article
            scope.removeArticle(scope.articles[0]);
            
            scope.restoreTrash();
            
            // reset counts
            count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            expect(count).toBe(1);
            expect(scope.trashcount).toBe(0);
            expect(scope.articles).toEqual([{ id: 1, date: '1/1/2013', text: 'some text', visible: false}]);             
        });
        
        it ('Should return 0 articles when the search term is not in an article title', function() {
            expect(scope.search).toBeUndefined();
            scope.search = 'senate';
            
            $httpBackend.flush();
            
            var count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            // we should have one article
            expect(count).toBe(1);
            
            scope.doSearch();
            
            count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            // we should have no articles now
            expect(count).toBe(0);
        });
        
        it ('Should return an article when the search term is in an article title', function() {
            expect(scope.search).toBeUndefined();
            scope.search = 'some';
            
            $httpBackend.flush();
            
            var count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            // we should have one article
            expect(count).toBe(1);
            
            scope.doSearch();
            
            count = 0;
            for (var article in scope.articles) {
                count++;
            }
            
            // we should still have one article
            expect(count).toBe(1);
        });        
        
    });
    
    describe("ArticleCtrl", function() {
        
        var scope, ctrl, $httpBackend;
        
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('json/posts/1.json').respond([{ description: 'this is an article description' }]);
            scope = $rootScope.$new();
            ctrl = $controller(ArticleCtrl, {$scope: scope});
            
        }));
        
        it('Should fetch an article', function() {
            expect(scope.description).toBeUndefined();
            scope.showArticle('1');
            //expect(scope.description).toEqual('this is an article description');
        });
        
    });    
    
});