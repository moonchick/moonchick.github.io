(function(){
  'use strict';

  angular
    .module('appController')
    .controller('beratAyamController', beratAyamController);

  function beratAyamController() {
    var vm = this;
    var tanggal = [];
    var beratAktual = [];
    var beratIdeal = [0, 0, 0, 0, 0, 0, 160, 200, 240, 280, 320, 350, 390, 430, 490, 550,
                      610, 670, 730, 780, 840, 920, 1000, 1080, 1160, 1240, 1320, 1400, 1490, 1570,
                      1660, 1750, 1840, 1930, 2020, 2100, 2190, 2280, 2370, 2450, 2540, 2630];

    var ref = firebase.database().ref('grafik/kandang1/grid');
    var ref2 = firebase.database().ref('grafik/kandang2/grid');
    var ref3 = firebase.database().ref('grafik/kandang3/grid');
    var ref4 = firebase.database().ref('grafik/kandang4/grid');
    var ref5 = firebase.database().ref('grafik/kandang5/grid');
    var ref6 = firebase.database().ref('grafik/kandang6/grid');

    /* Hitung Rata-Rata Berat Ayam*/
    ref.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual.push(0);
        } else {
          beratAktual.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels = tanggal;
    vm.data = [beratAktual, beratIdeal];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.colors = ['#3399ff', '#00E676'];
    vm.datasetOverride = [
      {
        label: 'Actual Weight',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
      {
        label: 'Ideal Weight',
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
            labelString: 'Berat Ayam (gram)'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 3000,
            stepSize: 600
          }
        }]
      }    
    };
    
    var tanggal2 = [];    
    var beratAktual2 = [];
    ref2.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal2.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual2.push(0);
        } else {
          beratAktual2.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels2 = tanggal2;
    vm.data2 = [beratAktual2, beratIdeal];

    var tanggal3 = [];    
    var beratAktual3 = [];
    ref3.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal3.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual3.push(0);
        } else {
          beratAktual3.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels3 = tanggal3;
    vm.data3 = [beratAktual3, beratIdeal];

    var tanggal4 = [];    
    var beratAktual4 = [];
    ref4.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal4.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual4.push(0);
        } else {
          beratAktual4.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels4 = tanggal4;
    vm.data4 = [beratAktual4, beratIdeal];

    var tanggal5 = [];    
    var beratAktual5 = [];
    ref5.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal5.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual5.push(0);
        } else {
          beratAktual5.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels5 = tanggal5;
    vm.data5 = [beratAktual5, beratIdeal];
    
    var tanggal6 = [];    
    var beratAktual6 = [];
    ref6.once('value')
    .then(function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var date = childSnapshot.key;
        var split = date.split('-');

        var tgl = split[2] + '-' + split[1] + '-' + split[0];

        tanggal6.push(tgl);

        /* Hitung Total Berat Ayam per Hari */
        var sum = 0;
        var count = 0;
        childSnapshot.forEach(function (childSnapshot) {
          var berat = childSnapshot.val().berat;

          if (berat > 0) {
            sum += berat;
            count ++;

          }
        });

        if (count == 0) {
          beratAktual6.push(0);
        } else {
          beratAktual6.push((sum/count).toFixed(2));
        }
        

      });

    });

    vm.labels6 = tanggal6;
    vm.data6 = [beratAktual6, beratIdeal];
  }

})();
