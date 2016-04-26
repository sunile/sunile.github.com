angular.module('adminManageDires',[])
.directive('circle', function(){
	// Runs during compile
	return {
		restrict: 'E', 
		replace: true
		
	};
})

.directive('rectangle',function(){
	return{
		restrict:'E',
		replace:true
	}
})

.directive('oval',function(){
	return {
		restrict:'E',
		replace:true
	}
})

.directive('line',function(){
	return {
		restrict:'E',
		replace:true
	}
})

// .directive('loading', [function () {
// 	return {
// 		restrict: 'A',
// 		link: function (scope, iElement, iAttrs) {

			
// 		}
// 	};
// }])