'use strict';
(function() {

var app = angular.module('bosdecoApp', []);

app.controller('GeneralController', ['$scope', function ($scope) {
    this.myVar = 'value of my var...'; 
    this.chairs = chairs;
    this.armchairs = armchairs;

}]);


var chairs = [
    {	
        name: 'Chaise - Louis XV',
        image: 'chaises/01.jpg',
        dim: '94 x 50 x 43',
        ref: '1006',
        price:'249,00'
    },
    {
        name: 'Chaise - Louis XV',
        image: 'chaises/01.jpg',
        dim: '99 x 49 x 50',
        ref: '1011',
        price:'249,00'
    },
    {
        name: 'Chaise médaillon - Louis XVI',
        image: 'chaises/03.jpg',
        dim: '95 x 50 x 46',
        ref: '1029',
        price:'359,00'
    },
    {
        name: 'Chaise médaillon canné - Louis XVI',
        image: 'chaises/04.jpg',
        dim: '95 x 50 x 46',
        ref: '1030',
        price:'359,00'
    },

    {
        name: 'Chaise médaillon canné - Louis XVI',
        image: 'chaises/04_2.jpg',
        dim: '95 x 50 x 46',
        ref: '1035',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XVI',
        image: 'chaises/05.jpg',
        dim: '94 x 47 x 42',
        ref: '1037',
        price:'359,00'
    },
    {
        name: 'Chaise dos canné - Louis XVI',
        image: 'chaises/06.jpg',
        dim: '94 x 47 x 42',
        ref: '1038',
        price:'359,00'
    },
    {
        name: 'Chaise médaillon - sculpté rubans',
        image: 'chaises/07.jpg',
        dim: '94 x 64 x 60',
        ref: '1041',
        price:'359,00'
    },

    {
        name: 'Louis XVI - Jacob',
        image: 'chaises/08.jpg',
        dim: '103 x 49 x 46',
        ref: '1045',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XV',
        image: 'chaises/09.jpg',
        dim: '103 x 50 x 46',
        ref: '1087',
        price:'359,00'
    },
    {
        name: 'Chaise Cabriolet - Louis XV',
        image: 'chaises/10.jpg',
        dim: '104 x 52 x 48',
        ref: '1090',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XVI',
        image: 'chaises/11.jpg',
        dim: '101 x 49 x 46',
        ref: '1096',
        price:'359,00'
    },

    {
        name: 'Chaise Barok',
        image: 'chaises/12.jpg',
        dim: '103 x 52 x 49',
        ref: '1099',
        price:'359,00'
    }
		
]; //and chaises

var armchairs = [
    {	
        name: 'Fauteil Cabriolet - Louis XV',
        image: 'fauteuils/13.jpg',
        dim: '93 x 62 x 53',
        ref: '1002',
        price:'359,00'
    },
    {
        name: 'Fauteil Cabriolet - Louis XV',
        image: 'fauteuils/14.jpg',
        dim: '98 x 59 x 53',
        ref: '1004',
        price:'359,00'
    },
    {
        name: 'Fauteil Cabriolet - Louis XV',
        image: 'fauteuils/15.jpg',
        dim: '99 x 59 x 52',
        ref: '1012',
        price:'359,00'
    },
    {
        name: 'Fauteil Cabriolet - Louis XV',
        image: 'fauteuils/16.jpg',
        dim: '100 x 56 x 49',
        ref: '1032',
        price:'359,00'
    },
    {
        name: 'Fauteil médaillon canné  - Louis XV ',
        image: 'fauteuils/17.jpg',
        dim: '95 x 50 x 46',
        ref: '1035',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XVI',
        image: 'fauteuils/18.jpg',
        dim: '94 x 47 x 42',
        ref: '1037',
        price:'359,00'
    },
    {
        name: 'Chaise dos canné - Louis XVI',
        image: 'fauteuils/19.jpg',
        dim: '94 x 47 x 42',
        ref: '1038',
        price:'359,00'
    },
    {
        name: 'Chaise médaillon - sculpté rubans',
        image: 'fauteuils/20.jpg',
        dim: '94 x 64 x 60',
        ref: '1041',
        price:'359,00'
    },
    {
        name: 'Louis XVI - Jacob',
        image: 'chaises/08.jpg',
        dim: '103 x 49 x 46',
        ref: '1045',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XV',
        image: 'chaises/09.jpg',
        dim: '103 x 50 x 46',
        ref: '1087',
        price:'359,00'
    },
    {
        name: 'Chaise Cabriolet - Louis XV',
        image: 'chaises/10.jpg',
        dim: '104 x 52 x 48',
        ref: '1090',
        price:'359,00'
    },
    {
        name: 'Chaise - Louis XVI',
        image: 'chaises/11.jpg',
        dim: '101 x 49 x 46',
        ref: '1096',
        price:'359,00'
    },
    {
        name: 'Chaise Barok',
        image: 'chaises/12.jpg',
        dim: '103 x 52 x 49',
        ref: '1099',
        price:'359,00'
    }
] //and chaises

})();