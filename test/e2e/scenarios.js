'use strict';

describe('wtaApp', function() {
   
   beforeEach(function() {
        browser().navigateTo('../../index.html');
   });
   
    describe('Home Page', function() {
        
        it('should display 5 results', function() {
            expect(repeater('ul li').count()).toEqual(5);
        });
        
        it('should display 1 result when searching for "Senate"', function() {
            input('search').enter('senate');
            element(':button').click();
            expect(repeater('ul li').count()).toEqual(1);
        });
        
        it('should display 0 results when searching for "ghostbuster"', function() {
            input('search').enter('ghostbuster');
            element(':button').click();
            expect(repeater('ul li').count()).toEqual(0);
        });        
        
        it('should display 4 results when removing an item', function() {           
            element('li:nth-child(4) .clear').click();
            expect(repeater('ul li').count()).toEqual(4);
        });
    });
});