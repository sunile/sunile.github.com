angular.module('adminManageServices', [])

.factory('Students', ['$resource',
    function($resource) {
        return $resource('http://1.sunile22.applinzi.com/Home/student/:id', 
            { id: "@id" },
            {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'update':{method:'PUT'},
            'delete': { method: 'DELETE' }
        });
    }
])

.factory('Allinfo', ['$resource',function ($resource) {
   
     return $resource('http://1.sunile22.applinzi.com/Home/allinfo/:academy_id/:department_id/:major_id', 
        {academy_id: "@academy_id",
        department_id:"@department",
        major_id:"@major_id"},
            {
            'get': { method: 'GET'},
            'save': { method: 'POST'},
            'query': { method: 'GET'},
            'remove': { method: 'DELETE'},
            'update':{method:'PUT'},
            'delete': { method: 'DELETE'}
        });
}])

.factory('MajorCourse', ['$resource',function ($resource) {
   
     return $resource('http://1.sunile22.applinzi.com/Home/course/:academy_id/:major_id/:student_id', 
        {academy_id: "@academy_id",major_id:"@major_id",student_id:"@student_id"},
            {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'update':{method:'PUT'},
            'delete': { method: 'DELETE' }
        });
}])

.factory('MyCourse', ['$resource',function ($resource) {
   
     return $resource('http://1.sunile22.applinzi.com/Home/mycourse/:academy_id/:major_id/:student_id', 
        {academy_id: "@academy_id",major_id:"@major_id",student_id:"@student_id"},
            {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET'},
            'remove': { method: 'DELETE' },
            'update':{method:'PUT'},
            'delete': { method: 'DELETE' }
        });
}])

.factory('CourContent', ['$resource',function ($resource) {
   
     return $resource('http://1.sunile22.applinzi.com/Home/courContent/:course_id/:teacher_id', 
        {course_id: "@course_id",teacher_id:"@teacher_id"},
            {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET'},
            'remove': { method: 'DELETE' },
            'update':{method:'PUT'},
            'delete': { method: 'DELETE' }
        });
}])

.factory('CourInfo', ['$resource',function ($resource) {
   
     return $resource('http://1.sunile22.applinzi.com/Home/courInfo/:course_id/:teacher_id', 
        {course_id: "@course_id",teacher_id:"@teacher_id"},
            {
            'get': { method: 'GET' },
            'save': { method: 'POST' },
            'query': { method: 'GET'},
            'remove': { method: 'DELETE' },
            'update':{method:'PUT'},
            'delete': { method: 'DELETE' }
        });
}])




// .factory('Students', ['$resource',
//     function($resource) {
//         return $resource('http://1.sunile22.applinzi.com/Home/student/:id', 
//             { id: "@id" },
//             {
//             'get': { method: 'GET' },
//             'save': { method: 'POST' },
//             'query': { method: 'GET', isArray: true },
//             'remove': { method: 'DELETE' },
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE' }
//         });
//     }
// ])

// .factory('Allinfo', ['$resource',function ($resource) {
   
//      return $resource('http://1.sunile22.applinzi.com/Home/allinfo/:academy_id/:department_id/:major_id', 
//         {academy_id: "@academy_id",
//         department_id:"@department",
//         major_id:"@major_id"},
//             {
//             'get': { method: 'GET'},
//             'save': { method: 'POST'},
//             'query': { method: 'GET'},
//             'remove': { method: 'DELETE'},
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE'}
//         });
// }])

// .factory('MajorCourse', ['$resource',function ($resource) {
   
//      return $resource('http://1.sunile22.applinzi.com/Home/course/:academy_id/:major_id/:student_id', 
//         {academy_id: "@academy_id",major_id:"@major_id",student_id:"@student_id"},
//             {
//             'get': { method: 'GET' },
//             'save': { method: 'POST' },
//             'query': { method: 'GET', isArray: true },
//             'remove': { method: 'DELETE' },
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE' }
//         });
// }])

// .factory('MyCourse', ['$resource',function ($resource) {
   
//      return $resource('http://1.sunile22.applinzi.com/Home/mycourse/:academy_id/:major_id/:student_id', 
//         {academy_id: "@academy_id",major_id:"@major_id",student_id:"@student_id"},
//             {
//             'get': { method: 'GET' },
//             'save': { method: 'POST' },
//             'query': { method: 'GET'},
//             'remove': { method: 'DELETE' },
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE' }
//         });
// }])

// .factory('CourContent', ['$resource',function ($resource) {
   
//      return $resource('http://1.sunile22.applinzi.com/Home/courContent/:course_id/:teacher_id', 
//         {course_id: "@course_id",teacher_id:"@teacher_id"},
//             {
//             'get': { method: 'GET' },
//             'save': { method: 'POST' },
//             'query': { method: 'GET'},
//             'remove': { method: 'DELETE' },
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE' }
//         });
// }])

// .factory('CourInfo', ['$resource',function ($resource) {
   
//      return $resource('http://1.sunile22.applinzi.com/Home/courInfo/:course_id/:teacher_id', 
//         {course_id: "@course_id",teacher_id:"@teacher_id"},
//             {
//             'get': { method: 'GET' },
//             'save': { method: 'POST' },
//             'query': { method: 'GET'},
//             'remove': { method: 'DELETE' },
//             'update':{method:'PUT'},
//             'delete': { method: 'DELETE' }
//         });
// }])



