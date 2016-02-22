/**
 * Created by Stian on 11.02.2016.
 */
(function() {
    var app = angular.module('store', []);

    app.controller('StoreController', function() {
        this.themes = gems;
    });
    app.controller('ReviewController', function(){
        this.review = {};

        this.addReview = function(product){
            product.reviews.push(this.review);
            this.review = {};
        };
    });

    app.controller('PanelController', function() {
        this.tab = 1;

        this.selectTab = function(newValue) {
            this.tab = newValue;
        };

        this.isSelected = function(tabName){
            return this.tab === tabName;
        };
    });

    app.directive('productTitle', function(){
        return{
            restrict: 'E',
            templateUrl: 'product-title.html'
        };
    });

    app.directive('productSpecs', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-specs.html'
        };
    });
    app.directive('productDescription', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-themeDescription.html'
        };
    });
    app.directive('productReviews', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-reviews.html'
        };
    });
    app.directive('productPanels', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-panels.html',
            controller: function(){
               
            },
            controllerAs: 'panels'
        };
    });

    var gems = [
        {
            themeName: 'Azurite',
            themeDescription: "asdasdasdasd",
            price: 2,
            soldOut: false,
            canPurchase: true,
            date: 1388123412323,
            reviews: [
                {
                    stars: 5,
                    body: "This gem is awesome",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 2,
                    body: "This gem is not awesome, just boring",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 3,
                    body: "This gem is ok",
                    author: "joey@shoemaker.com"
                }
            ]
        },
        {
            themeName: 'Bloodstone',
            themeDescription: "Hallooooo",
            price: 5.95,
            soldOut: false,
            canPurchase: true,
            date: 1388123412323,
            reviews: [
                {
                    stars: 5,
                    body: "This gem is awesome",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 2,
                    body: "This gem is not awesome, just boring",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 3,
                    body: "This gem is ok",
                    author: "joey@shoemaker.com"
                }
            ]
        },
        {
            themeName: 'Zircon',
            themeDescription: "Trololololo",
            price: 3.95,
            soldOut: false,
            canPurchase: true,
            date: 1388123412323,
            reviews: [
                {
                    stars: 5,
                    body: "This gem is awesome",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 2,
                    body: "This gem is not awesome, just boring",
                    author: "joey@shoemaker.com"
                },
                {
                    stars: 3,
                    body: "This gem is ok",
                    author: "joey@shoemaker.com"
                }
            ]
        }
    ];
})();