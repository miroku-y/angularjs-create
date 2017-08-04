 var demoApp = angular.module('demoApp',[]);
    demoApp.filter('paging',function(){      //paging 过滤器
    return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
                                      //  start 也就是 paging 后面传的参数，即 currentPage*listsPerPage
      return lists.slice(start);     //将原始数据按照 start 分割
    };
  });
  
  demoApp.controller('demoCtrl',['$scope',function($scope){  //页面控制器
   $scope.demoLists = [                                     //模拟数据
     {name:['hello world','hello world again',
        'why i say hello wrold',
        'i dont know the reason',
        'maybe because i am a developer.',
        'thank you for reading this',
        'why i say thank you',
        'cause this stuff has nothing to  do with your angularJs studying',
        'these are just demo sentences.',
        'Do not have any special meanings.',
        'and you still take time to read this row by row',
        'what could i say?',
        'Do not have any special meanings.',
        'and you still take time to read this row by row',
        'what could i say?',
        'what could i say?',
        'and you still take time to read this row by row',
        'what could i say?',
        'what could i say?',
        'okay.maybe you wanna lenrn how json works.']
    }
 ];
     $scope.dataNum =  $scope.demoLists[0].name.length;  //获得数据总个数
     $scope.pages = Math.ceil($scope.dataNum/3);         //按照每页显示3个数据，得到总页数
     $scope.pageNum = [];                                //生成页码，在 html里 ng-repeat 出来
     for(var i=0;i<$scope.pages;i++){
       $scope.pageNum.push(i);
     }
 
     $scope.currentPage = 0;                       //设置当前页是 0
     $scope.listsPerPage = 3;                      //设置每页显示 3 个
 
     $scope.setPage = function(num){             // 当点击页码数字时执行的函数
       $scope.currentPage = num;                 //将当前页 设置为 页码数
     }
 
     $scope.prevPage = function(){               //点击上一页执行的函数
           if($scope.currentPage > 0){
               $scope.currentPage--;
           }
       }
      $scope.nextPage = function(){              //点击下一页执行的函数
           if ($scope.currentPage < $scope.pages-1){
               $scope.currentPage++;
           }
       }
 }]);