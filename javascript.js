var app = angular.module('uploadPage', []);

app.controller('uploadController', ['$scope', function uploadController($scope) {
    var cropper,
	canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
    
    this.originalFiles = [];
    this.portfolio = [];
    this.files = [];
    this.ifCanvas = false;
    this.scaleX;
    this.scaleY;

    this.uploadFile = function uploadFile() {
	var files = document.getElementById('uploadInput').files;
	
	for(var i = 0; i < files.length; i++) {
	    reader = new FileReader();
	    reader.onload = this.loaded;
	    reader.readAsDataURL(files[i]);
	}

    };
    
    this.loaded = function(e) {
	$scope.$apply(function() {
	    $scope.vm.files.push(e.target.result);
	});
    };
    
    this.addToPortfolio = function addToPortfolio($event) {
	var img = document.createElement('img');
	img.src =  $event.target.currentSrc;
	img.style.maxWidth = '100%';
	img.style.maxHeight = '40%';

	document.getElementById('canvas').style.maxWidth = '100%';
	document.getElementById('canvas').style.maxHeight = '40%';

	if(this.ifCanvas == true) {
	    cropper.destroy();
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    this.ifCanvas = false;
	}
	this.ifCanvas = true;
        canvas.width = img.width;
	canvas.height = img.height;
	
        ctx.drawImage(img, 0, 0);  
	
	cropper = new Cropper(canvas, {viewMode: 2});
    };

    this.rotate = function rotate() {
	cropper.rotate(90);
    };

    this.scale = function scale() {
	cropper.scale(this.scaleX, this.scaleY);
    };

    this.deleteFromPortfolio = function deleteFromPortfolio($event) {
	var index = this.portfolio.indexOf($event.target.currentSrc);

	this.portfolio.splice(index, 1);
	$scope.$apply();
    };
    
    this.results = function() {
	this.portfolio.push(cropper.getCroppedCanvas().toDataURL());
	cropper.destroy();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.ifCanvas = false;
    }
}]);

