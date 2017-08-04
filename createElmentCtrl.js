var demoApp = angular.module('demoApp',[]);
demoApp.controller('creatElmentCtrl',['$scope',function($scope){
	$scope.obj = {
		getList : [],//已经创建的banner个数
		createAllCount:3,//总共可创建的banner个数
		repeatArr:[],//页面循环输出的banner数组
		createBannerCount:'',//还可以创建的banner个数

		getResultFun:function(num){
			$scope.obj.createBannerCount = ($scope.obj.createAllCount - num) -1;
			//alert($scope.obj.createBannerCount)
		}
	};
	
	//在请求已经创建的banner方法中调用
		//$scope.readerCreateFun($scope.obj.getList.length,$scope.obj.createAllCount);
		var res = 1;//请求后的已创建条数
		$scope.obj.getResultFun(res);
		//如果已创建的banner数小于3，就初始化默认显示一条
		if(res<$scope.obj.createAllCount){
			$scope.obj.repeatArr.push({
				key:0,
				hideAdd:true,
				hideMinus:true,
			});
		}else if(res == $scope.obj.createAllCount){
			$scope.obj.repeatArr = [];
		}
	
	console.log($scope.obj.repeatArr)
	//alert($scope.obj.createBannerCount)
		
	$scope.addBanner = function(index){
		alert(index)
		if($scope.obj.createBannerCount!=0){
			$scope.obj.repeatArr[$scope.obj.repeatArr.length] = {
				key:$scope.obj.repeatArr.length,
				hideAdd:true,
				hideMinus:true,
			}
			$scope.obj.createBannerCount--;
			if($scope.obj.createBannerCount == 0){
				//$scope.obj.repeatArr[index].showAdd = false;
			}
			console.log($scope.obj.repeatArr)
			$scope.hideAdd(index);
			// alert($scope.obj.createBannerCount)
		};

	};
	$scope.minusBanner = function(index){
		//alert(index)
		if($scope.obj.repeatArr.length!=1){
			$scope.obj.repeatArr.splice(index,1);
			$scope.obj.createBannerCount++;
			$scope.hideMinus(index);
			alert($scope.obj.createBannerCount)
		};
		
		console.log($scope.obj.repeatArr)
	};
	$scope.hideAdd = function(index){
		if($scope.obj.createAllCount == res){
			return false;
		}
		//for(var i=0;i<$scope.obj.repeatArr.length;i++){
		if(res == $scope.obj.createAllCount -1){//2
			return $scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideAdd = false,
			$scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideMinus = false;
		}
		if(index != undefined){
			
			//$scope.obj.repeatArr[index].hideAdd = false;
			$scope.obj.repeatArr[index].hideMinus = true;
		}else if(index == undefined){
			$scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideAdd = true;
		}
		if($scope.obj.createBannerCount == 0){
			$scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideAdd = false;
			for(var i=0;i<$scope.obj.repeatArr.length;i++){
				$scope.obj.repeatArr[i].hideAdd = false;
			}
		}else{
			// for(var i=0;i<$scope.obj.repeatArr.length;i++){
			// 	$scope.obj.repeatArr[i].hideAdd = true;
			// }
			// $scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideAdd = false;
		}
		//}
	};
	$scope.hideMinus = function(index){
		// alert($scope.obj.createBannerCount)
		if($scope.obj.repeatArr.length == 1){
			$scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideMinus = false;
			if($scope.obj.createBannerCount!=0){
				$scope.obj.repeatArr[$scope.obj.repeatArr.length - 1].hideAdd = true;
			}
		}else{
			for(var i=0;i<$scope.obj.repeatArr.length;i++){
				$scope.obj.repeatArr[i].hideMinus = true;
				$scope.obj.repeatArr[i].hideAdd = true;
			}
		}
	}
	$scope.hideAdd();
	$scope.hideMinus();

	
	//准备一个fileRender方法，把图片转换成base64位进行提交
	$scope.reader = new FileReader();
	//存放转换后的base64
	$scope.thumb = {};
	//上传图片方法
	$scope.pullImg = function(files){
		console.log(files);
		$scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
		$scope.reader.readAsDataURL(files[0]);
		$scope.reader.onload = function(ev){
			$scope.$apply(function(){
				$scope.thumb[$scope.guid] = {
					imgSrc:ev.target.result
				}
				//console.log($scope.thumb[$scope.guid].imgSrc)
			})
		};
		

		//开始像后台提交数据-----formData方式
		var data = new FormData();
		data.append('image',files[0]);
		data.append('guid',$scope.guid);
		
		console.log(data.append);
	};
	
}]);
// demoApp.directive('createbox',function(){
// 	return {
// 		restrick:'E',
// 		replace : true,
// 		template:   '<div class="create-group"  obj="obj">'
// 			            +'    <div class="cover-map">'
// 				        +'        <span>封面图</span>'
// 				        +'        <p>'
// 				        +'          <button>上传图片</button>'
// 				        +'          <input type="file">'
// 				        +'        </p>'
// 				        +'        <span>建议不要上传1g图片</span>'
// 				        +'        <b style="transform:rotate(130deg)">+</b>'
// 			            +'    </div>'
// 				        +'        <div class="link-obj">'
// 				        +'        <span>链接地址</span>'
// 				        +'        <input type="text" placeholder="请输入准确的地址">'
// 				        +'        <b ng-click=addBanner($index)>+</b>'
// 			            +'    </div>'
// 			            +'</div>',
// 		scope:{
// 			obj:'='
// 		},
// 		link:function($scope,attrs){
// 			console.log($scope.obj)
// 			// $scope.obj.getList.length = 1;
// 			$scope.addBanner = function(index){
// 				alert(index)
// 				if($scope.obj.getList.length != $scope.obj.createAllCount){
// 					$scope.obj.getList[$scope.obj.getList.length] = {
// 						key:1,
// 						name:'第1个'
// 					}
// 				}
// 				console.log($scope.obj.getList)
// 				//console.log($scope.obj.getList.length)
// 			}
// 		}
// 	}
// });