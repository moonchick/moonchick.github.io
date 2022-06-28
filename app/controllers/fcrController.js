(function(){
  'use strict';

  angular
    .module('appController')
    .controller('fcrController', fcrController);

  function fcrController() {
    var vm = this;
    var tanggal   = [];
    var nilaiFcr  = [];
    var standarFcr = [
      0, 0, 0, 0, 0, 0, 0.856, 0.885, 0.914, 0.943, 0.972, 1.001, 1.030, 1.059, 1.088, 1.117, 1.145, 1.174, 1.203, 1.232, 
      1.261, 1.287, 1.314, 1.340, 1.367, 1.393, 1.419, 1.446, 1.470, 1.493, 1.517, 1.540, 1.564, 1.587, 1.611, 1.632, 1.653, 
      1.675, 1.696, 1.717, 1.738, 1.760, 1.780, 1.8, 1.821, 1.841, 1.861, 1.881, 1.902, 1.922, 1.943, 1.963, 1.984, 2.004
    ];

    var refSetting = firebase.database().ref().child('setting');
    var refPakan = firebase.database().ref('grafik/kandang1/feedandmortality');
    var refPakan2 = firebase.database().ref('grafik/kandang2/feedandmortality');
    var refPakan3 = firebase.database().ref('grafik/kandang3/feedandmortality');
    var refPakan4 = firebase.database().ref('grafik/kandang4/feedandmortality');
    var refPakan5 = firebase.database().ref('grafik/kandang5/feedandmortality');
    var refPakan6 = firebase.database().ref('grafik/kandang6/feedandmortality');

    refSetting.on("value", function (snapshot) {
        vm.totalAyam1 = snapshot.val().jumlahAwalAyamLantai1;
        vm.totalAyam2 = snapshot.val().jumlahAwalAyamLantai2;
        vm.totalAyam3 = snapshot.val().jumlahAwalAyamLantai3;
        vm.totalAyam4 = snapshot.val().jumlahAwalAyamLantai4;
        vm.totalAyam5 = snapshot.val().jumlahAwalAyamLantai5;
        vm.totalAyam6 = snapshot.val().jumlahAwalAyamLantai6;
    });

    refPakan.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam1 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr.push(fcr.toFixed(2));
      })
    });

    vm.labels = tanggal;
    vm.data = [nilaiFcr, standarFcr];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.colors = ['#FF1744', '#00E676'];
    vm.datasetOverride = [
      {
        label: 'Nilai FCR',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
      {
        label: 'FCR Standar',
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
            labelString: 'FCR'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 2,
            stepSize: 0.4
          }
        }]
      } 
    };

    //2
    var tanggal2   = [];
    var nilaiFcr2  = [];
    refPakan2.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal2.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam2 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr2.push(fcr.toFixed(2));
      })
    });
    vm.labels2 = tanggal2;
    vm.data2 = [nilaiFcr2, standarFcr];

    //3
    var tanggal3   = [];
    var nilaiFcr3  = [];
    refPakan3.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal3.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam3 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr3.push(fcr.toFixed(2));
      })
    });
    vm.labels3 = tanggal3;
    vm.data3 = [nilaiFcr3, standarFcr];

    //4
    var tanggal4   = [];
    var nilaiFcr4  = [];
    refPakan4.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal4.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam4 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr4.push(fcr.toFixed(2));
      })
    });
    vm.labels4 = tanggal4;
    vm.data4 = [nilaiFcr4, standarFcr];

    //5
    var tanggal5   = [];
    var nilaiFcr5  = [];
    refPakan5.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal5.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam5 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr5.push(fcr.toFixed(2));
      })
    });
    vm.labels5 = tanggal5;
    vm.data5 = [nilaiFcr5, standarFcr];

    //6
    var tanggal6   = [];
    var nilaiFcr6  = [];
    refPakan6.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamMati   = 0;
      var ayamHidup  = 0;
      var rataBerat  = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = childSnapshot.key;
        var split = date.split('-');

        var push = split[2] + '-' + split[1] + '-' + split[0];

        if (berat != null) {
          tanggal6.push(push);
        }   

        if (pakan == null) {
          pakan = 0;
        }

        if (mati == null) {
          mati = 0;
        }
        
        rataBerat = (childSnapshot.val().berat)/1000;
        totalPakan += pakan * 50;
        ayamMati += mati;

        ayamHidup = vm.totalAyam6 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }     

        nilaiFcr6.push(fcr.toFixed(2));
      })
    });
    vm.labels6 = tanggal6;
    vm.data6 = [nilaiFcr6, standarFcr];
    
  }

})();
