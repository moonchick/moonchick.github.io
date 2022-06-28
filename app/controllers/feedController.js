(function(){
  'use strict';

  angular
    .module('appController')
    .controller('feedController', feedController);

  function feedController() {
    var vm = this;
    var tanggal = [];
    var pakanHarian = [];
    var pakanTotal = [];
    var pakanStandar = [
      5, 6, 7, 9, 10, 11, 12, 14, 16, 18, 21, 23, 25, 28, 30,
      33, 35, 38, 40, 43, 45, 47, 50, 52, 54, 56, 58, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60
    ];

    var total = 0;
    var ref = firebase.database().ref().child('grafik').child('kandang1').child('feedandmortality');
    ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total += pakan;

          if (pakan != null) {
            tanggal.push(tgl);
          }
          
          pakanHarian.push(pakan);
          pakanTotal.push(total);
        });
      });

    vm.labels = tanggal;
    vm.data = [pakanHarian, pakanStandar];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.colors = ['#FF1744', '#00E676'];
    vm.datasetOverride = [
      {
        label: 'Daily Feed',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
     {
        label: 'Standard Feed',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      }
    ];
    vm.options = { 
      legend: { 
        display: true 
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Daily Feed (per bag)'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20
          }
        }]
      } 
    };

    //2
    var tanggal2 = [];
    var pakanHarian2 = [];
    var pakanTotal2 = [];
    var total2 = 0;
    var ref2 = firebase.database().ref().child('grafik').child('kandang2').child('feedandmortality');
    ref2.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total2 += pakan;

          if (pakan != null) {
            tanggal2.push(tgl);
          }
          
          pakanHarian2.push(pakan);
          pakanTotal2.push(total2);
        });
      });

    vm.labels2 = tanggal2;
    vm.data2 = [pakanHarian2, pakanStandar];

    //3
    var tanggal3 = [];
    var pakanHarian3 = [];
    var pakanTotal3 = [];
    var total3 = 0;
    var ref3 = firebase.database().ref().child('grafik').child('kandang3').child('feedandmortality');
    ref3.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total3 += pakan;

          if (pakan != null) {
            tanggal3.push(tgl);
          }
          
          pakanHarian3.push(pakan);
          pakanTotal3.push(total3);
        });
      });

    vm.labels3 = tanggal3;
    vm.data3 = [pakanHarian3, pakanStandar];

    //4
    var tanggal4 = [];
    var pakanHarian4 = [];
    var pakanTotal4 = [];
    var total4 = 0;
    var ref4 = firebase.database().ref().child('grafik').child('kandang4').child('feedandmortality');
    ref4.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total4 += pakan;

          if (pakan != null) {
            tanggal4.push(tgl);
          }
          
          pakanHarian4.push(pakan);
          pakanTotal4.push(total4);
        });
      });

    vm.labels4 = tanggal4;
    vm.data4 = [pakanHarian4, pakanStandar];

    //5
    var tanggal5 = [];
    var pakanHarian5 = [];
    var pakanTotal5 = [];
    var total5 = 0;
    var ref5 = firebase.database().ref().child('grafik').child('kandang5').child('feedandmortality');
    ref5.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total5 += pakan;

          if (pakan != null) {
            tanggal5.push(tgl);
          }
          
          pakanHarian5.push(pakan);
          pakanTotal5.push(total5);
        });
      });

    vm.labels5 = tanggal5;
    vm.data5 = [pakanHarian5, pakanStandar];

    //6
    var tanggal6 = [];
    var pakanHarian6 = [];
    var pakanTotal6 = [];
    var total6 = 0;
    var ref6 = firebase.database().ref().child('grafik').child('kandang6').child('feedandmortality');
    ref6.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var pakan = childSnapshot.val().pakan;

          total6 += pakan;

          if (pakan != null) {
            tanggal6.push(tgl);
          }
          
          pakanHarian6.push(pakan);
          pakanTotal6.push(total6);
        });
      });

    vm.labels6 = tanggal6;
    vm.data6 = [pakanHarian6, pakanStandar];
    
  }

})();
