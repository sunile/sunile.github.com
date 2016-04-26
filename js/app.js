// 可注册多个配置块
angular.module("adminManageApp",[
	'ngSanitize',
	'ngResource',
	'angular-timeline',
	'ui.router',
	'ui.bootstrap',
	'adminManageCtrls',
	'adminManageFilters',
	'adminManageServices',
	'adminManageDires',
	'com.2fdevs.videogular',
	'com.2fdevs.videogular.plugins.controls',
	'com.2fdevs.videogular.plugins.overlayplay',
	'com.2fdevs.videogular.plugins.poster',
	'com.2fdevs.videogular.plugins.buffering'
	])
/**
 * 整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 */
.run(function($rootScope,$state,$stateParams){
	$state = $rootScope.$state;
	$stateParams = $rootScope.$stateParams;
	var any = $rootScope.any={};
	any.status = 0;
	any.user='';
    any.activeLi='';
   any.activeCourseID='';

})

.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/start");
	$stateProvider
	.state('start',{
		url:"/start",
		views:{
			'':{
				templateUrl:"tpls/start.html"
			},
			'main@start':{
				templateUrl:"tpls/login.html"
			},
			'topbar@start':{
				templateUrl:"tpls/topbar.html",
				controller:"topbarCtrl"
			}
		}
	})
	.state('start.test',{
		url:"/test",
		views:{
			'main@start':{
				templateUrl:"tpls/test.html",
				controller:"StudentsCtrl"
			}
		}
	})
	// 登录
	.state('start.login',{
		url:"/login",
		views:{
			'main@start':{
				templateUrl:"tpls/login.html",
				controller:"loginCtrl"
			}
		}
	})
	.state('start.major_course',{
		url:"/major_course",
		views:{
			'main@start':{
				templateUrl:"tpls/start.major_course.html",
				controller:"major_courseCtrl"
			}
		}
	})
	// .state('start.course',{
	// 	url:"/course",
	// 	views:{
	// 		'main@start':{
	// 			templateUrl:"tpls/start.course.html"
	// 		}
	// 	}
	// })
	.state('start.course.category',{
		url:"/{courseType:[0-9]{1,4}}",
		templateUrl:"tpls/start.mycourse.html",
		controller:'courseCtrl'
	})

	.state('start.course_detail',{
		url:'/course_detail',
		views:{
			'main@start':{
				templateUrl:"tpls/start.course_detail.html",
				controller:'courDetailCtrl'
			}
		}
	})

	.state('start.course_detail.courInfo',{
		url:'/courInfo/{courseId:[0-9]{1,4}}',
		views:{
			'content@start.course_detail':{
				templateUrl:"tpls/start.courInfo.html",
				controller:'courInfoCtrl'
			}
		}

	})

	.state('start.course_detail.courContent',{
		url:'/courContent/{courseId:[0-9]{1,4}}',
		views:{
			'content@start.course_detail':{
				templateUrl:"tpls/start.courContent.html",
				controller:'courContentCtrl'
			}
		}
	})


	// video
	.state('start.course_detail.courContent.video',{
		url:'/video',
		views:{
			'content@start.course_detail':{
				templateUrl:"tpls/start.video.html",
				controller:'courVideoCtrl'
			}
		}
	})


	.state('start.course_detail.courProgress',{
		url:'/courProgress/{courseId:[0-9]{1,4}}',
		views:{
			'content@start.course_detail':{
				templateUrl:"tpls/start.courProgress.html",
				controller:'courDetailCtrl'
			}
		}
	})

	.state('start.course_detail.courCommunity',{
		url:'/courCommunity/{courseId:[0-9]{1,4}}',
		views:{
			'content@start.course_detail':{
				templateUrl:"tpls/start.courCommunity.html",
				controller:'courDetailCtrl'
			}
		}
	})




/********************************** 个人主页*************/
	

	.state('start.myRoom',{
		url:"/room",
		views:{
			'main@start':{
				templateUrl:'tpls/start.myRoom.html',
				controller:'myRoomCtrl'
			}
		}

	})

	.state('start.myRoom.course',{
		url:"/course",
		templateUrl:"tpls/start.myRoom.majorCourses.html",
		controller:'myMajorCouCtrl'
	})

	.state('start.myRoom.notes',{
		url:"/notes",
		template:"<h1>这是我的笔记</h1>",
		// templateUrl:"tpls/start.mycourse.html"
		// controller:'courseCtrl'
	})

	.state('start.myRoom.statistics',{
		url:"/statistics",
		template:"<h1>这是我的学习统计</h1>",
		// templateUrl:"tpls/start.mycourse.html"
		// controller:'courseCtrl'
	})
	/****个人信息****/
	.state('start.myRoom.info',{
		url:"/info",
		templateUrl:"tpls/start.myRoom.info.html",
		controller:'userInfoCtrl'
	})
	.state('start.myRoom.info.basic',{
		url:"/basic",
		templateUrl:"tpls/start.myRoom.info.basic.html",
		controller:'userInfoCtrl'
	})
	.state('start.myRoom.info.image',{
		url:"/image",
		templateUrl:"tpls/start.myRoom.info.image.html",
		controller:'userInfoCtrl'
	})
	.state('start.myRoom.info.pwd',{
		url:"/pwd",
		templateUrl:"tpls/start.myRoom.info.pwd.html",
		controller:'pwdCtrl'
	})
});