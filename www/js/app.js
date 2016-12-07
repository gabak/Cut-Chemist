angular.module('starter', ['ionic', 'starter.controllers','youtube-embed'])

//Settings
.value('config', {
   
    //Youtube Channel
    Youtube_channelId : 'UCZQkB-KNsHxRj71bPXRvLyg',
    Youtube_channelName : 'MarioNevJr'
    

})
.run(function($ionicPlatform) {
  //Admob
var Admob_banner ='ca-app-pub-2645249852630768/5734188132';
var Admob_interstitial ='ca-app-pub-2645249852630768/8687654538';
//console.log(Admob_banner);
  $ionicPlatform.ready(function(config) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

     

  var admobid = {};
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { 
                banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                 banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        } else {
            admobid = { // for Windows Phone
                banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        }

  if(window.AdMob) AdMob.createBanner( {
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER, 
      autoShow:true} );
  var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        } else {
            admobid = { // for Windows Phone
                 banner: Admob_banner,
                interstitial: Admob_interstitial
            };
        }
 
  if(window.AdMob) AdMob.createBanner( {
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER, 
      autoShow:true} );
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })

    .state('app.categoriesVideos', {
      url: '/categoriesVideos/:id/:title',
      views: {
        'menuContent': {
          controller: 'CategoriesVideosCtrl',
          templateUrl: 'templates/categoriesVideos.html'
        }
      }
      
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          controller: 'PlaylistsCtrl',
          templateUrl: 'templates/playLists.html'
        }
      }
      
    })
    
    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          controller: 'ContactCtrl',
          templateUrl: 'templates/contact.html'
        }
      }
      
    })

    .state('app.mostPopular', {
      url: '/mostPopular',
      views: {
        'menuContent': {
          controller: 'MostPopularCtrl',
          templateUrl: 'templates/mostPopular.html'
        }
      }
      
    })

    .state('app.detailsVideo', {
      url: '/detailsVideo/:detailsVideoId',
      views: {
        'menuContent': {
          controller: 'DetailsVideoCtrl',
          templateUrl: 'templates/detailsVideo.html'
        }
      }
      
    })


    .state('app.playList', {
      url: '/playList/:id/:title',
      views: {
        'menuContent': {
          controller: 'PlayListCtrl',
          templateUrl: 'templates/playListVideos.html'
        }
      }
      
    })


    .state('app.comments', {
      url: '/comments',
      views: {
        'menuContent': {
          controller: 'CommentsCtrl',
          templateUrl: 'templates/Comments.html'
        }
      }
      
    })

     .state('app.commentsVideos', {
      url: '/commentsVideos/:videoId',
      views: {
        'menuContent': {
          controller: 'CommentsVideoCtrl',
          templateUrl: 'templates/commentsVideo.html'
        }
      }
      
    })

      .state('app.commentsDetails', {
      url: '/commentDetails/:parent_id',
      views: {
        'menuContent': {
          controller: 'CommentsDetailsCtrl',
          templateUrl: 'templates/commentsDetails.html'
        }
      }
      
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
