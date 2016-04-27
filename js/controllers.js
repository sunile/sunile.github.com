// 这种注册provider的方法消除了创建多余变量（潜在的全局）的风险
angular.module('adminManageCtrls', [])

/********顶部导航*********/
.controller('topbarCtrl', ['$scope','$rootScope','$state', function($scope,$rootScope,$state) {
    var vm = $scope.vm = {};
    vm.student_name=sessionStorage.getItem('student_name');
    vm.logout=function(){
        $rootScope.any.status=0;
        $state.go("start.login");
    }
    vm.setting=function(){
        $rootScope.any.activeLi=3;
        $state.go("start.myRoom.info.basic");
    }
    vm.defaultIndex=function(){
         $rootScope.any.activeLi=0;
         $state.go("start.myRoom.course");
    }
}])
/********登录操作**********/
.controller('loginCtrl', function($scope,$state,$rootScope,Students) {
    var vm = $scope.vm = {};
    vm.status='';
    vm.errorPwd='';
    vm.errorAccount='';
    vm.userInfo = {
        "account": "",
        "pwd": ""
    }
    vm.reset = function() {
        vm.userInfo = {
            "account": "",
            "pwd": ""
        }
    }
vm.loginSuccess = function() {
    vm.students=Students.save({id:vm.userInfo.account},{account:vm.userInfo.account,password:vm.userInfo.pwd},
        function(res){
            if(res.status==1){
                $rootScope.any.status=1;
                $rootScope.any.user=res.user;
                sessionStorage.setItem('student_id',res.user.student_id);
                sessionStorage.setItem('student_name',res.user.student_name);
                sessionStorage.setItem('academy_id',res.user.academy_id);
                sessionStorage.setItem('major_id',res.user.major_id);
                sessionStorage.setItem('department_id',res.user.department_id);
                $state.go("start.major_course");
            }
            else if(vm.status==-1){
                vm.tip=-1;
                vm.errorAccount=res.info;
                console.log(-1);
            }
            else{
                vm.tip=-2;
                vm.errorPwd=res.info;
                console.log(-2);
            }
        });   
    }

    vm.change=function(){
        vm.tip=0;

    };
})

// 连锁调用对控制器的注册逻辑，每次对controller的调用会返回模块的实例，用户继续调用方法
.controller('courseCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
}])

.controller('major_courseCtrl', ['$scope','$rootScope','MajorCourse','MyCourse', function($scope,$rootScope,MajorCourse,MyCourse) {
    var vm = $scope.vm = {};
    /*********分类导航变量***********/
    vm.activeType = 0;
    vm.activeProperty = 0;
    vm.activeCredit = 0;
    vm.activeTerm = 0;
    vm.courType1 = '';
    vm.courType2 = '';
    vm.courType3 = '';
    vm.courType4 = '';
    vm.courTypes = [{ 'id': '0', 'type': '不限' }, { 'id': '1', 'type': '公共基础课程' }, { 'id': '2', 'type': '学科大类课程' }, { 'id': '3', 'type': '专业领域（核心课程）' }, { 'id': '4', 'type': '专业领域（方向课程）' }, { 'id': '5', 'type': '专业领域（实践课程）' }];
    vm.courPropeties = [{ 'id': '0', 'type': '不限' }, { 'id': '1', 'type': '必修' }, { 'id': '2', 'type': '选修' }];
    vm.courCredit = [{ 'id': '0', 'credit': '不限' }, { 'id': '1', 'credit': '1' }, { 'id': '2', 'credit': '2' }, { 'id': '3', 'credit': '3' }, { 'id': '4', 'credit': '4' }, { 'id': '5', 'credit': '5' }, { 'id': '6', 'credit': '6' }];
    vm.courTerm = [{ 'id': '0', 'term': '不限' }, { 'id': '1', 'term': '大一上学期' }, { 'id': '2', 'term': '大一下学期' }, { 'id': '3', 'term': '大二上学期' }, { 'id': '4', 'term': '大二下学期' }, { 'id': '5', 'term': '大三上学期' }, { 'id': '6', 'term': '大三下学期' }, { 'id': '7', 'term': '大四上学期' }, { 'id': '8', 'term': '大四下学期' }];

    /*********分类导航函数*********/
    vm.courseNav1 = function(evt, start) {
        vm.activeType = start;
        vm.courType1 = evt.target.innerHTML;
        if (vm.courType1 == '不限')
            vm.courType1 = '';
    };
    vm.courseNav2 = function(evt, start) {
        vm.activeProperty = start;
        vm.courType2 = evt.target.innerHTML;

        if (vm.courType2 == '不限')
            vm.courType2 = '';
    };
    vm.courseNav3 = function(evt, start) {
        vm.activeCredit = start;
        vm.courType3 = evt.target.innerHTML;

        if (vm.courType3 == '不限')
            vm.courType3 = '';
    };
    vm.courseNav4 = function(evt, start) {
        vm.activeTerm = start;
        vm.courType4 = evt.target.innerHTML;

        if (vm.courType4 == '不限')
            vm.courType4 = '';
    };
    /************用于分页**********/
    vm.courses = [];
    vm.page = {
        size: 12, //每页存12个课程
        currentPage: 1
    };
    vm.status=0;
    vm.student_id = sessionStorage.getItem("student_id");
    vm.academy_id = sessionStorage.getItem("academy_id");
    vm.major_id = sessionStorage.getItem("major_id");
    MajorCourse.save({},{academy_id:vm.academy_id,
        major_id:vm.major_id,
        student_id:vm.student_id
    },
        function(res){
        vm.courses=res.majorCour;
        for(var i=0;i<vm.courses.length;i++){
            vm.courses[i].credit=vm.courses[i].credit+'学分';
        }
        vm.status=1;
    });
    vm.selectCour = function(evt,courseID,teacherID){
        vm.selectCourid = courseID;
        vm.teacherID = teacherID;
        MyCourse.update({},{
           student_id:vm.student_id,
           selectCourid:vm.selectCourid,
           teacher_id:vm.teacherID
        },function(res){
            evt.target.innerHTML="已选";
        });

    }
}])

/************ 个人主页*****************/
.controller('myRoomCtrl', ['$scope', '$rootScope','Allinfo',
    function($scope,$rootScope,Allinfo) {
    var vm = $scope.vm = {};
    vm.status=0;
    vm.academy_id=sessionStorage.getItem("academy_id"); 
    vm.department_id=sessionStorage.getItem("department_id"); 
    vm.major_id=sessionStorage.getItem("major_id"); 
    Allinfo.get({academy_id:vm.academy_id,
        department_id:vm.department_id,
        major_id:vm.major_id},
        function(res){
        $rootScope.any.allinfo=res;
        vm.userInfo = {
        'imgUrl': $rootScope.any.user.image,
        'academy':$rootScope.any.allinfo.academy.academy_abbr,
        'department':$rootScope.any.allinfo.department.department_name,
        'major': $rootScope.any.allinfo.major.major_name
         };
         vm.status=1;
    });

    vm.list = [
        { 'id': '0', 'type': '我的课程', 'icon': '123', 'state': 'course' },
        { 'id': '1', 'type': '学习笔记', 'icon': '123', 'state': 'notes' },
        { 'id': '2', 'type': '学习统计', 'icon': '123', 'state': 'statistics' },
        { 'id': '3', 'type': '个人设置', 'icon': '123', 'state': 'info.basic' }
    ];

}])


/**************info设置***************/
.controller('userInfoCtrl', ['$scope','Students', function($scope,Students) {
    var vm = $scope.vm = {};
    vm.status=0;
    vm.list = [
        { 'id': '0', 'type': '基本信息', 'state': 'basic' },
        { 'id': '1', 'type': '密码设置', 'state': 'pwd' }
        // { 'id': '1', 'type': '头像设置', 'state': 'image' }
    ];
    vm.student_id=sessionStorage.getItem("student_id"); 
    vm.student_name=sessionStorage.getItem("student_name"); 
    Students.get({id:vm.student_id},{student_id:vm.student_id},
        function(res){
            vm.status=1;
            vm.info=res;
            vm.sex = res.sex;
            vm.mail =res.mail;
            vm.tel = res.tel;
            vm.text =res.text;
    });
    vm.update=function(){
        Students.update({id:vm.student_id},
        {
            student_id:vm.student_id,
            sex:vm.sex,
            mail:vm.mail,
            tel:vm.tel,
            text:vm.text
        },
            function(res){
                console.log(res.info);
        });
    }
    vm.reset=function(){
        vm.sex = vm.info.sex;
        vm.mail =vm.info.mail;
        vm.tel = vm.info.tel;
        vm.text =vm.info.text;
    }

 }])

.controller('pwdCtrl', ['$scope','Students', 
    function ($scope,Students) {
    var vm = $scope.vm = {};
    vm.student_id=sessionStorage.getItem("student_id");
    vm.pwd='';
    vm.old_pwd='';
    vm.new_pwd='';
    vm.verify_pwd='';
    vm.tip=0;
    vm.check=function(){
        Students.get({id:vm.student_id},{student_id:vm.student_id},
        function(res){
            if(vm.old_pwd!=res.password){
                vm.tip=-1;
            }
            else{
                vm.tip=2;
            }
    });   
    };
    vm.verify=function(){
        if(vm.verify_pwd!=vm.new_pwd){
            vm.tip=-2;
        }
        else{
            vm.tip=3;
        }
    };
    vm.change=function(){
        vm.tip=0;
    };
    vm.update=function(){
        vm.tip=0;
        Students.update({id:vm.student_id},
            {student_id:vm.student_id,pwd:vm.verify_pwd},
            function(res){
                console.log(res);

        });

    };
    vm.reset=function(){

    };
   
}])

/*****************我的专业课程********************/ 
.controller('myMajorCouCtrl', ['$scope','$rootScope','MyCourse', 
    function($scope,$rootScope,MyCourse) {
    var vm = $scope.vm = {};
    vm.major_require_courses=[];
    vm.fundamental_require_courses=[];
    vm.general_courses=[];
    vm.events=[];
    vm.status=0;
    vm.student_id = sessionStorage.getItem("student_id");
    vm.academy_id = sessionStorage.getItem("academy_id");
    vm.major_id = sessionStorage.getItem("major_id");
MyCourse.query({academy_id:vm.academy_id ,major_id:vm.major_id,student_id:vm.student_id},
        function(res){
            vm.majorPlan_option_credit=res.majorPlan_option[0].credit;
            vm.majorPlan_require_credit=res.majorPlan_require[0].credit;
            vm.majorPlan_core_require_credit=res.majorPlan_core_require[0].credit;
            vm.majorPlan_directional_selective_credit=res.majorPlan_directional_selective[0].credit;
            vm.majorPlan_practice_require_credit=res.majorPlan_practice_require[0].credit;
            vm.majorPlan_practice_selective_credit=res.majorPlan_practice_selective[0].credit;
            vm.majorPlan_general_require_credit=res.majorPlan_general_require[0].credit;
            vm.majorPlan_fundamental_require_credit=res.majorPlan_fundamental_require[0].credit;
            vm.majorPlan_majorPlan_fundamental_selective_credit=res.majorPlan_fundamental_selective[0].credit;
            
            if(res.required[0].credit==null){
                res.required[0].credit=0;
            }
            if(res.optioned[0].credit==null){
                res.optioned[0].credit=0;
            }
            if(res.core_required[0].credit==null){
                res.core_required[0].credit=0;
            } 
            if(res.directional_optioned[0].credit==null){
                res.directional_optioned[0].credit=0;
            } 
            if(res.practice_required[0].credit==null){
                res.practice_required[0].credit=0;
            }
             if(res.practice_optioned[0].credit==null){
                res.practice_optioned[0].credit=0;
            }
             if(res.basic_required[0].credit==null){
                res.basic_required[0].credit=0;
            }
            if(res.fundamental_required[0].credit==null){
                res.fundamental_required[0].credit=0;
            }
            if(res.fundamental_optioned[0].credit==null){
                res.fundamental_optioned[0].credit=0;
            }
            vm.required=res.required[0].credit;
            vm.optioned=res.optioned[0].credit;
            vm.core_required_credit=res.core_required[0].credit;
            vm.directional_optioned_credit=res.directional_optioned[0].credit;
            vm.practice_required_credit=res.practice_required[0].credit;
            vm.practice_optioned_credit=res.practice_optioned[0].credit;
            vm.basic_required_credit=res.basic_required[0].credit;
            vm.fundamental_required_credit=res.fundamental_required[0].credit;
            vm.fundamental_optioned_credit=res.fundamental_optioned[0].credit;
    vm.events = [{
        term: '1',
        badgeClass: 'info',
        titleClass: 'title1',
        title: '大一上学期',
        content: 'the first term',
        major_core_courses:res.myCour.term_1.core,
        major_option_courses:res.myCour.term_1.option,
        major_practice_courses:res.myCour.term_1.practice,
        fundamental_courses:res.myCour.term_1.basic,
        general_courses:res.myCour.term_1.general
    }, {
        term: '2',
        badgeClass: 'info',
        titleClass: 'title1',
        title: '大一下学期',
        content: 'the second term',
        major_core_courses:res.myCour.term_2.core,
        major_option_courses:res.myCour.term_2.option,
        major_practice_courses:res.myCour.term_2.practice,
        fundamental_courses:res.myCour.term_2.basic,
        general_courses:res.myCour.term_2.general
    }, {
        term: '3',
        badgeClass: 'warning',
        titleClass: 'title2',
        title: '大二上学期',
        content: 'the third term',
        major_core_courses:res.myCour.term_3.core,
        major_option_courses:res.myCour.term_3.option,
        major_practice_courses:res.myCour.term_3.practice,
        fundamental_courses:res.myCour.term_3.basic,
        general_courses:res.myCour.term_3.general
    }, {
        term: '4',
        titleClass: 'title2',
        badgeClass: 'warning',
        title: '大二下学期',
        content: 'the fourth term',
        major_core_courses:res.myCour.term_4.core,
        major_option_courses:res.myCour.term_4.option,
        major_practice_courses:res.myCour.term_4.practice,
        major_practice_courses:res.myCour.term_4.practice,
        fundamental_courses:res.myCour.term_4.basic,
        general_courses:res.myCour.term_4.general
    }, {
        term: '5',
        badgeClass: 'danger',
        titleClass: 'title3',
        title: '大三上学期',
        content: 'the fifth term',
        major_core_courses:res.myCour.term_5.core,
        major_option_courses:res.myCour.term_5.option,
        major_practice_courses:res.myCour.term_5.practice,
        fundamental_courses:res.myCour.term_5.basic,
        general_courses:res.myCour.term_5.general
    }, {
        term: '6',
        badgeClass: 'danger',
        titleClass: 'title3',
        title: '大三下学期',
        content: 'the sixth term',
        major_core_courses:res.myCour.term_6.core,
        major_option_courses:res.myCour.term_6.option,
        major_practice_courses:res.myCour.term_6.practice,
        fundamental_courses:res.myCour.term_6.basic,
        general_courses:res.myCour.term_6.general
    }, {
        term: '7',
        badgeClass: 'primary',
        titleClass: 'title4',
        title: '大四上学期',
        content: 'the seventh term',
        major_core_courses:res.myCour.term_7.core,
        major_option_courses:res.myCour.term_7.option,
        major_practice_courses:res.myCour.term_7.practice,
        fundamental_courses:res.myCour.term_7.basic,
        general_courses:res.myCour.term_7.general
    }, {
        term: '8',
        badgeClass: 'primary',
        titleClass: 'title4',
        title: '大四上下学期',
        content: 'the eighth term',
        major_core_courses:res.myCour.term_8.core,
        major_option_courses:res.myCour.term_8.option,
        major_practice_courses:res.myCour.term_8.practice,
        fundamental_courses:res.myCour.term_8.basic,
        general_courses:res.myCour.term_8.general
    }];
    vm.status=1;
        });

    vm.getCourse=function(courseID,teacherID){
        $rootScope.any.activeCourseID=courseID;      
        $rootScope.any.selectedTeacherID=teacherID;
        console.log($rootScope.any.activeCourseID);      
        console.log($rootScope.any.selectedTeacherID);      
    };
}])

/********************课程详情页**********************/
.controller('courDetailCtrl', ['$scope', '$rootScope',function($scope,$rootScope) {
    var vm = $scope.vm = {};
    // vm.courName =$rootScope.any.course_name;
    vm.list = [
        { 'id': '0', 'type': '课程信息', 'state': 'courInfo' },
        { 'id': '1', 'type': '课程内容', 'state': 'courContent' },
        { 'id': '2', 'type': '学习进度', 'state': 'courProgress' },
        { 'id': '3', 'type': '学习社区', 'state': 'courCommunity' }
    ];

}])
/*********************课程信息************************/ 
.controller('courInfoCtrl', ['$scope','$rootScope','CourInfo', function($scope,$rootScope,CourInfo) {
    var vm = $scope.vm = {};
    vm.cour_intro='';
    vm.cour_outline='';
    vm.teacher_name='';
    vm.teacher_info='';
    vm.status=0;
    CourInfo.get({},
        {course_id:$rootScope.any.activeCourseID ,
        teacher_id:$rootScope.any.selectedTeacherID},
        function(res){
            $rootScope.any.course_name=res.cour_info[0].major_course_name;
            vm.cour_intro=res.cour_info[0].course_intro;
            vm.cour_outline=res.cour_info[0].course_outline;
            vm.teacher_name=res.cour_teacher[0].teacher_name;
            vm.teacher_info=res.cour_teacher[0].teacher_info;
            vm.outline_array=vm.cour_outline.split(';');
            vm.status=1;
    });
}])



/*******************课程内容*************************/ 
.controller('courContentCtrl', ['$scope','$rootScope','CourContent', function($scope,$rootScope,CourContent) {
    var vm = $scope.vm = {};
    vm.chapter='';
    vm.status=0;
    CourContent.query({},
        {course_id:$rootScope.any.activeCourseID ,
        teacher_id:$rootScope.any.selectedTeacherID},
        function(res){
        vm.chapter=res.result.chapter;
        vm.status=1;
    });
    vm.getVideo=function(resourceName,resourceUrl){
        $rootScope.any.resource_name=resourceName;
        $rootScope.any.resource_url=resourceUrl;
    }
}])


/******************视频展示*********************/ 
.controller('courVideoCtrl', ['$scope','$rootScope', '$sce', function($scope,$rootScope,$sce) {
    var vm = $scope.vm = {};
    vm.videoName=$rootScope.any.resource_name;
    this.config = {
        preload: "none",
        sources: [
            { src: $sce.trustAsResourceUrl($rootScope.any.resource_url), type: "video/mp4" }
        ],
        theme: "lib/videogular-themes-default/videogular.css",
        plugins: {
            poster: "http://www.videogular.com/assets/images/videogular.png",
            analytics: {
                category: "Videogular",
                label: "Main",
                events: {
                    ready: true,
                    play: true,
                    pause: true,
                    stop: true,
                    complete: true,
                    progress: 10
                }
            }
        }
    };

}])


