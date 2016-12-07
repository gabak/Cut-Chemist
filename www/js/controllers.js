angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,config,$http,$ionicLoading) {
  
    $scope.contactts = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'channels',
      part: 'id,snippet',
      q: config.Youtube_channelName
    }

$scope.contactts=[];

       

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.contactHome = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics,brandingSettings,topicDetails',
          id: response['items'][0]['snippet']['channelId']
        }
      

    $http.get('https://www.googleapis.com/youtube/v3/channels', {params:$scope.youtubeParams2}).success(function(response){
        $scope.contactHome=response['items'][0];
       
});

});
      });

})
.filter('duration',function(){
return function(input){
   var a = input.match(/\d+/g);

    if (input.indexOf('M') >= 0 && input.indexOf('H') == -1 && input.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }

    if (input.indexOf('H') >= 0 && input.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (input.indexOf('H') >= 0 && input.indexOf('M') == -1 && input.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    input = 0;

    if (a.length == 3) {
        input = input + parseInt(a[0]) * 3600;
        input = input + parseInt(a[1]) * 60;
        input = input + parseInt(a[2]);
    }

    if (a.length == 2) {
        input = input + parseInt(a[0]) * 60;
        input = input + parseInt(a[1]);
    }

    if (a.length == 1) {
        input = input + parseInt(a[0]);
    }
    var h = Math.floor(input / 3600);
    var m = Math.floor(input % 3600 / 60);
    var s = Math.floor(input % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
})

.controller('HomeCtrl', function($scope,$http,$ionicLoading,config,$ionicModal) {

  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });


    $scope.videoss1 = [];
    $scope.youtubeParams1 = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'video',
      part: 'id,snippet',
      channelId: config.Youtube_channelId,
      maxResults:1,
      order:'date'
    }

$scope.videoss1=[];

        j=0;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams1}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videos1 = [];
        $scope.youtubeParams22 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics',
          id: response['items'][j]['id']['videoId']

        }
      j++;

    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams22}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videosFirst=response.items[0];
      });
    });
        $ionicLoading.hide();

      });
    });



        $scope.videoss = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'video',
      part: 'id,snippet',
      channelId: config.Youtube_channelId,
      maxResults:10,
      order:'date'
    }

$scope.videoss=[];

        i=1;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        //console.log(response.items);
        $scope.videos = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics',
          id: response['items'][i]['id']['videoId']

        }
      i++;

    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videos.push(child);
      });
    });
        $ionicLoading.hide();

      });
    });


})
.controller('CategoriesVideosCtrl', function($scope,$http,$ionicLoading,config,$stateParams) {
    $scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }

     $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });

    youtubeApiCall();


  $scope.Next = function() {
  $scope.pageToken=$scope.pageTokenNext;
   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
  youtubeApiCall();
  }

  $scope.Prev = function() {
  $scope.pageToken=$scope.pageTokenPrev;
   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
 youtubeApiCall();
  }


  function youtubeApiCall() {
    $scope.categorieVideos=$stateParams.title;
    $scope.categoriesVideos = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      part: 'id,snippet',
      type: 'video',
      q: config.Youtube_channelName,
      channelId: config.Youtube_channelId,
      videoCategoryId:$stateParams.id,
      maxResults:20,
      pageToken:$scope.pageToken
    }

$scope.categoriesVideos=[];


    i=0;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){

        $scope.pageTokenNext=response.nextPageToken;
        $scope.pageTokenPrev=response.prevPageToken;
        $scope.categoriesVideoss = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics',
          id: response['items'][i]['id']['videoId'],
          order:'date'

        }

    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.categoriesVideoss.push(child);
      });
    });
        $ionicLoading.hide(); 
      i++;
      });
    });

}

})

.controller('CategoriesCtrl', function($scope,$http,$ionicLoading,config) {
     $scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }

     $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
    
    $scope.categories = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      part: 'id,snippet',
      regionCode:'US',
      q: config.Youtube_channelName,
      channelId: config.Youtube_channelId
    }

$scope.categories=[];


    $http.get('https://www.googleapis.com/youtube/v3/videoCategories', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.categories.push(child);
        //console($scope.categories);
        $ionicLoading.hide();
      });
    });

})
.controller('DetailsVideoCtrl', function($scope,$http,$ionicLoading,config,$stateParams,$ionicModal,$ionicPlatform) {
     $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
    
     $ionicModal.fromTemplateUrl('templates/descriptionVideo.html', {
    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  document.addEventListener("pause", onPause, false);

  function onPause() {
var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    // Handle the pause event
}
    $scope.detailsVideo = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      part: 'id,snippet,contentDetails,statistics',
      id:$stateParams.detailsVideoId
    }

$scope.detailsVideo=[];

    
    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams}).success(function(response){
        
        $scope.detailsVideo=response.items[0];
        $ionicLoading.hide();
      });
})


.controller('CommentsVideoCtrl', function($scope,$http,$ionicLoading,config,$stateParams) {
    
  $scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }

       $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });

    $scope.comments = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'channels',
      part: 'id,snippet',
      q: config.Youtube_channelName
    }

     $scope.comments=[];

      

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
     
        $scope.commentts = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet',
          maxResults:50,
          videoId:$stateParams.videoId
        }
    
    
    $http.get('https://www.googleapis.com/youtube/v3/commentThreads', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.commentts.push(child);
        $ionicLoading.hide();
      });


});
      });
})
  
.controller('CommentsDetailsCtrl', function($scope,$http,$ionicLoading,config,$stateParams) {
    
  $scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }
    
       $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });

        $scope.comments = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'channels',
      part: 'id,snippet',
      q: config.Youtube_channelName
    }

     $scope.comments=[];

        i=0;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.commentts = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet',
          channelId: response['items'][i]['id']['channelId']
        }
      i++;
    j=0;
    $http.get('https://www.googleapis.com/youtube/v3/commentThreads', {params:$scope.youtubeParams2}).success(function(response){
     
               $scope.commentss = [];
        $scope.youtubeParams3 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet',
          parentId: $stateParams.parent_id
        }


      $http.get('https://www.googleapis.com/youtube/v3/comments', {params:$scope.youtubeParams3}).success(function(response){
      angular.forEach(response.items, function(child){
       $scope.commentss.push(child);
       $ionicLoading.hide();
       });
 
      });
      j++;
     
});

});
      });
})
  
.controller('PlaylistsCtrl', function($scope,$http,$ionicLoading,config) {
    $scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }

     $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
    
    $scope.playlists = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      part: 'id,snippet,contentDetails',
      maxResults:'50',
      q: config.Youtube_channelName,
      channelId: config.Youtube_channelId
    }

$scope.playlists=[];


    $http.get('https://www.googleapis.com/youtube/v3/playlists', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.playlists.push(child);
        $scope.moredata=true;
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
      });
    });

})


.controller('PlayListCtrl', function($scope,$http,$ionicLoading,config,$stateParams) {
    
$scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
  $scope.PlayListTitle=$stateParams.title;

    $scope.PlayList = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'video',
      part: 'id,snippet',
      q: config.Youtube_channelName,
      channelId: config.Youtube_channelId,
      order:'date'
    }

$scope.PlayLists=[];



    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        
    });
      $scope.PlayList = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails',
          playlistId: $stateParams.id,
          maxResults:50
        }

    i=0;
    $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.PlayLists.push(child);
        
    $scope.PlayListss = [];
        $scope.youtubeParams3 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics',
          id:response.items[i]['contentDetails']['videoId']
        }

    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams3}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.PlayListss.push(child);
        //console.log($scope.PlayListss);
        $ionicLoading.hide();

      });

      });
      
      i++;
      });
      

      });



    });

})
.controller('ContactCtrl', function($scope,$http,$ionicLoading,config) {

       $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });

    $scope.contactss = [];
    $scope.youtubeParamss = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'channels',
      part: 'id,snippet',
      q: config.Youtube_channelName
    }

$scope.contactss=[];

        i=0;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParamss}).success(function(response1){
      angular.forEach(response1.items, function(child){
        $scope.contactt = [];
        //console.log(response1);
        $scope.youtubeParamss2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics,brandingSettings,topicDetails',
          id: response1['items'][0]['snippet']['channelId']
        }
      i++;

    $http.get('https://www.googleapis.com/youtube/v3/channels', {params:$scope.youtubeParamss2}).success(function(response2){
      angular.forEach(response2.items, function(child){
        $scope.contactt=response2['items'][0];
        $ionicLoading.hide();
      });
});

});
      });
})
.controller('CommentsCtrl', function($scope,$http,$ionicLoading,config) {
    
  $scope.refresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
    }

       $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });

        $scope.comments = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'channels',
      part: 'id,snippet',
      q: config.Youtube_channelName
    }

     $scope.comments=[];

        i=0;

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.commentts = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet',
          channelId: response['items'][i]['id']['channelId'],
          maxResults:100
        }
      i++;
    
    $http.get('https://www.googleapis.com/youtube/v3/commentThreads', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.commentts.push(child);
        $ionicLoading.hide();
      });
});

});
      });
})
  .controller('MostPopularCtrl', function($scope,$http,$ionicLoading,config) {
    

$ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
$scope.refresh = function() {
        
        $scope.$broadcast('scroll.refreshComplete');
    }
    
  youtubeApiCall();


  $scope.Next = function() {
  $scope.pageToken=$scope.pageTokenNext;
   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
  youtubeApiCall();
  }

  $scope.Prev = function() {
  $scope.pageToken=$scope.pageTokenPrev;
   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
   });
 youtubeApiCall();
  }


  function youtubeApiCall() {
    $scope.MostPopular1 = [];
 

  $scope.youtubeParams = {
      key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
      type: 'video',
      part: 'id,snippet',
      q: config.Youtube_channelName,
      channelId: config.Youtube_channelId,
      order:'viewCount',
      maxResults:10,
      pageToken:$scope.pageToken
    }
 
$scope.mostPopular=[];

        i=0;
   

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
                
        $scope.pageTokenNext=response.nextPageToken;
        $scope.pageTokenPrev=response.prevPageToken;
       
        $scope.MostPopular1 = [];
        $scope.youtubeParams2 = {
          key: 'AIzaSyAXrk1HSRZX2tEPDhKoPGm7gQ49--IKp2k',
          part: 'id,snippet,contentDetails,statistics',
          id: response['items'][i]['id']['videoId']

        }
      i++;

    $http.get('https://www.googleapis.com/youtube/v3/videos', {params:$scope.youtubeParams2}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.mostPopular.push(child);
        $ionicLoading.hide();
      });
    });
   
     
    });

  });

}

});


