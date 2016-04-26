angular.module('adminManageFilters',[])
.filter('paging',function() {
	return function (courses, index, pageSize) {
	if (!courses)
      return [];

    var offset = (index - 1) * pageSize;
    return courses.slice(offset, offset + pageSize);
	  }
})
