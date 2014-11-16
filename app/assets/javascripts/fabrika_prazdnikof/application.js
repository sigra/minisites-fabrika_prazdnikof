// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require ./application/angular-sanitize.min
//= require ./application/angular-ui-router.min
//= require_self

var app = angular.module('fp', ['ui.router', 'ngSanitize'])

app.directive('stopEvent', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      element.bind('click', function (e) {
        e.stopPropagation();
      });
    }
  };
});

app.
  config(['$stateProvider', function($stateProvider){

    $stateProvider
      .state('index', {
        url: '',
        templateUrl: '/fabrika_prazdnikof/templates/main_menu.html',
        controller: function(){}
      })
      .state('page', {
        url: '/page/:page_id',
        templateUrl: '/fabrika_prazdnikof/templates/main_content.html',
        controller: PageController
      })
  }])

app.run(['$rootScope', '$state', '$stateParams', '$http', function ($rootScope, $state, $stateParams, $http) {
  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams

  $http.get('/fabrika_prazdnikof/settings.json').success( function(data){ $rootScope.settings = data.settings }).error( function(){ alert('Ошибка №1. Позвоните Андрею, он поможет')})
  $http.get('/fabrika_prazdnikof/feedbacks.json').success( function(data){
    $rootScope.feedbacks = data.feedbacks
    $rootScope.$broadcast('feedback:loaded')
  }).error( function(){ alert('Ошибка №2. Позвоните Андрею, он поможет')})

  // обработка слайдера фидбеков
  // запускается только после подгрузки всех фидбеков
  $rootScope.$on('feedback:loaded', function(){
    $rootScope.feedbacksLineStyle = { left: '0px' }

    function getFeedbackLeft(){
      return parseInt($rootScope.feedbacksLineStyle.left)
    }

    var panelWidth = 337
    $rootScope.feedbackCanMove = function(type){
      var left = getFeedbackLeft()

      if (type == 'left'){
        return (left < 0)
      } else {
        return ( left > (0 - panelWidth * ($rootScope.feedbacks.length - 2)) )
      }
    }
    $rootScope.moveFeedbackLeft = function(){
      var left = getFeedbackLeft()
      if ( $rootScope.feedbackCanMove('left') ) left += panelWidth

      $rootScope.feedbacksLineStyle.left = left + 'px'
    }
    $rootScope.moveFeedbackRight = function(){
      var left = getFeedbackLeft()
      if ( $rootScope.feedbackCanMove('right') ) left -= panelWidth

      $rootScope.feedbacksLineStyle.left = left + 'px'
    }
  })

  $rootScope.$on('page:loaded', function(){
    // обработка стрелок в режиме "большого фото" =)
    $rootScope.moveBigPhotoLeft = function(){
      if ($rootScope.canMoveBigPhoto('left')) $rootScope.activePhotoIndex--
    }
    $rootScope.moveBigPhotoRight = function(){
      if ($rootScope.canMoveBigPhoto('right')) $rootScope.activePhotoIndex++
    }
    $rootScope.canMoveBigPhoto = function(type){
      if ( type == 'left' )
        return $rootScope.activePhotoIndex > 0 && $rootScope.activePhotoIndex <= ($rootScope.photos.length - 1)
      else
        return $rootScope.activePhotoIndex < $rootScope.photos.length
    }
  })

  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  function getDocWidth() {
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      return window.innerWidth;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      return document.documentElement.clientWidth;
    }
  }

  $rootScope.rowStyle = { width: 'auto' }
  var fixWidth = 1295

  $rootScope.overflowStyle = { height: getDocHeight() }
  $rootScope.formState = false
  $rootScope.galleryState = false

  // чтобы притемнение было на всю высоту страницы
  $rootScope.$watch( getDocHeight, function(v){
    $rootScope.overflowStyle = { height: v+'px' }
  })

  // фикс бэкграундов на маленьких мониторах
  $rootScope.$watch( getDocWidth, function(v){
    if (v < fixWidth) {
      $rootScope.rowStyle = { width: fixWidth+'px' }
    } else {
      $rootScope.rowStyle = { width: 'auto' }
    }
  })

  $rootScope.buy = function(){
    var obj = { phone: $rootScope.phone, name: $rootScope.name }

    $rootScope.loadState = true

    $http.post('/fabrika_prazdnikof/', { params: obj }, { params: obj }).success( function(data){
      $rootScope.formState = false
      $rootScope.loadState = false
      alert('Ваша заявка принята! Мы обязательно перезвоним.')
    }).error( function(){ alert('Что-то не так! Попробуйте ещё раз') })
  }
}])

var PageController = ['$rootScope', '$scope', '$state', '$stateParams', '$http', function($root, $scope, $state, $stateParams, $http){

  $scope.pages = [
    { id: 'korporativi', name: 'корпоративные<br>праздники', img: '/assets/fabrika_prazdnikof/menu-1.png' },
    { id: 'oleg', name: 'ваш ведущий<br>Олег Погорелец', img: '/assets/fabrika_prazdnikof/menu-2.png' },
    { id: 'gulyaniya', name: 'массовые<br>гуляния', img: '/assets/fabrika_prazdnikof/menu-3.png' },
    { id: 'child', name: 'детские<br>праздники', img: '/assets/fabrika_prazdnikof/menu-4.png' },
    { id: 'birthday', name: 'дни<br>рождения', img: '/assets/fabrika_prazdnikof/menu-5.png' },
    { id: 'wedding', name: 'свадьбы', img: '/assets/fabrika_prazdnikof/menu-6.png' }
  ]

  $http.get('/fabrika_prazdnikof/pages/' + $stateParams.page_id + '.json')
    .success( function(data){
      $scope.text = data.page.text
      $root.photos = data.photos

      $root.$broadcast('page:loaded')
    })
    .error( function(){ return alert('Что-то пошло не так')})

  // обработка слайдера галлереи
  $root.$on('page:loaded', function(){
    $root.galleryLineStyle = { left: '0px' }

    function getGalleryLeft(){
      return parseInt($root.galleryLineStyle.left)
    }

    var panelWidth = 220
    $root.photoCanMove = function(type){
      var left = getGalleryLeft()

      if (type == 'left'){
        return (left < 0)
      } else {
        return ( left > (0 - panelWidth * ($root.photos.length - 2)) )
      }
    }
    $root.movePhotoLeft = function(){
      var left = getGalleryLeft()
      if ( $root.photoCanMove('left') ) {
        left += panelWidth
        $root.galleryLineStyle.left = left + 'px'

        return true
      }

      return false
    }
    $root.movePhotoRight = function(){
      var left = getGalleryLeft()
      if ( $root.photoCanMove('right') ) {
        left -= panelWidth
        $root.galleryLineStyle.left = left + 'px'

        return true
      }

      return false
    }
  })

  // загрузка фото в большом режиме
  $scope.showBigPhoto = function(index){
    $root.galleryState = true
    $root.activePhotoIndex = index
  }

  // инфа о текущей странице
  $scope.getCurrentPage = function(){
    var current = {}
    angular.forEach( $scope.pages, function(p){
      if ( p.id == $stateParams.page_id ) current = p
    })

    return current
  }

  $scope.page = $scope.getCurrentPage()

  /**
   * Убирает из меню текущую страницу
   */
  $scope.filtered = function(pages){
    var filtered = []

    angular.forEach( pages, function(p){
      if (p.id != $scope.page.id) filtered.push(p)
    })

    return filtered
  }
}]
