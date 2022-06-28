(function(){
  'use strict';

  angular
    .module('appController')
    .controller('mainController', mainController)
    .controller('LeftCtrl', leftCtrl);

  function mainController ($scope, $timeout, $mdSidenav, $log) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var ref_admin = firebase.database().ref('admin/' + user.uid);
        ref_admin.on('value', function (snapshot) {
          $scope.role = snapshot.val().role;
        });
      }
    });

    $scope.menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: 'menu.home'
      },
      {
        name: 'Feed Data',
        icon: 'create',
        sref: 'menu.input-data'
      },
    ];

    if ($scope.role == 'admin') {
      /* SideNav Menu */
      $scope.menuItems = [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          sref: 'menu.home'
        },
        {
          name: 'Input Data',
          icon: 'create',
          sref: 'menu.input-data'
        },
        {
          name: 'Panen',
          icon: 'archive',
          sref: 'menu.panen',
          role: 'admin'
        },
        {
          name: 'Pengaturan',
          icon: 'settings',
          sref: 'menu.pengaturan',
          role: 'admin'
        },
        {
          name: 'Daftar',
          icon: 'person',
          sref: 'menu.daftar',
          role: 'admin'
        }
      ];
    }
   
    /* md-sidenav */
    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  }
  
  function leftCtrl ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  }

})();