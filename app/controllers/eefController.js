(function(){
  'use strict';

  angular
    .module('appController')
    .controller('eefController', eefController);

  function eefController() {
    var vm = this;
    var tanggal   = [];
    var nilaiEef  = [];
    var standarEef = [
      0, 0, 0, 0, 0, 0, 271, 282, 288, 291, 291, 290, 288, 285, 294, 301, 305, 308, 310, 311, 310, 317, 322, 326, 329,
      331, 333, 334, 337, 339, 341, 342, 343, 343, 343, 343, 343, 342, 341, 340, 339, 337
    ];

    var refSetting = firebase.database().ref('setting');
    var refPakan = firebase.database().ref('grafik/kandang1/feedandmortality');
    var refPakan2 = firebase.database().ref('grafik/kandang2/feedandmortality');
    var refPakan3 = firebase.database().ref('grafik/kandang3/feedandmortality');
    var refPakan4 = firebase.database().ref('grafik/kandang4/feedandmortality');
    var refPakan5 = firebase.database().ref('grafik/kandang5/feedandmortality');
    var refPakan6 = firebase.database().ref('grafik/kandang6/feedandmortality');

    refSetting.on("value", function (snapshot) {
      vm.totalAyam1 = snapshot.val().jumlahAwalAyamLantai1;
      vm.tglMulai1 = snapshot.val().tanggalMulaiLantai1;
      vm.totalAyam2 = snapshot.val().jumlahAwalAyamLantai2;
      vm.tglMulai2 = snapshot.val().tanggalMulaiLantai2;
      vm.totalAyam3 = snapshot.val().jumlahAwalAyamLantai3;
      vm.tglMulai3 = snapshot.val().tanggalMulaiLantai3;
      vm.totalAyam4 = snapshot.val().jumlahAwalAyamLantai4;
      vm.tglMulai4 = snapshot.val().tanggalMulaiLantai4;
      vm.totalAyam5 = snapshot.val().jumlahAwalAyamLantai5;
      vm.tglMulai5 = snapshot.val().tanggalMulaiLantai5;
      vm.totalAyam6 = snapshot.val().jumlahAwalAyamLantai6;
      vm.tglMulai6 = snapshot.val().tanggalMulaiLantai6;
    });

    refPakan.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai1;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);
        vm.date = newDate.getDate() - 1;
        
        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam1 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam1)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef.push(eef.toFixed(2));
        }     
           
      })      

    });

    vm.labels = tanggal;
    vm.data = [nilaiEef, standarEef];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.colors = ['#FF1744', '#00E676'];
    vm.datasetOverride = [
      {
        label: 'Nilai IP Aktual',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
      {
        label: 'Nilai IP Standar',
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
            labelString: 'IP'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 700,
            stepSize: 140
          }
        }]
      } 
    };

    //2  
    var tanggal2   = [];
    var nilaiEef2  = [];
    refPakan2.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai2;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);

        vm.date = newDate.getDate() - 1;

        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam2 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam2)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef2.push(eef.toFixed(2));
        }     
           
      })      

    });
    vm.labels2 = tanggal2;
    vm.data2 = [nilaiEef2, standarEef];
    
    //3  
    var tanggal3   = [];
    var nilaiEef3  = [];
    refPakan3.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai3;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);

        vm.date = newDate.getDate() - 1;

        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam3 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam3)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef3.push(eef.toFixed(2));
        }     
           
      })      

    });
    vm.labels3 = tanggal3;
    vm.data3 = [nilaiEef3, standarEef];

    //4 
    var tanggal4   = [];
    var nilaiEef4  = [];
    refPakan4.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai4;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);

        vm.date = newDate.getDate() - 1;

        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam4 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam4)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef4.push(eef.toFixed(2));
        }     
           
      })      

    });
    vm.labels4 = tanggal4;
    vm.data4 = [nilaiEef4, standarEef];

    //5
    var tanggal5  = [];
    var nilaiEef5  = [];
    refPakan5.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai5;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);

        vm.date = newDate.getDate() - 1;

        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam5 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam5)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef5.push(eef.toFixed(2));
        }     
           
      })      

    });
    vm.labels5 = tanggal5;
    vm.data5 = [nilaiEef5, standarEef];

    //6
    var tanggal6   = [];
    var nilaiEef6  = [];
    refPakan6.once("value")
    .then(function (snapshot) {
      var totalPakan = 0;
      var ayamHidup  = 0;
      var ayamMati   = 0;
      var percentMortality  = 0;
      var rataBerat  = 0;

      vm.fcr = 0;
      vm.ip = 0;

      snapshot.forEach(function (childSnapshot) {
        var tgl = childSnapshot.key;
        var berat = childSnapshot.val().berat;
        var pakan = childSnapshot.val().pakan;
        var mati  = childSnapshot.val().ayamMati;

        var date = vm.tglMulai6;
        var dateL1 = tgl;

        var timestamp = new Date(date).getTime();
        var timestampL1 = new Date(dateL1).getTime();

        var diff = timestampL1 - timestamp;

        var newDate = new Date(diff);

        vm.date = newDate.getDate() - 1;

        if(vm.date == 0)
          vm.date = 31;

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

        // Hitung FCR
        ayamHidup = vm.totalAyam6 - ayamMati;

        if (rataBerat == 0) {
          var fcr = 0; 
        } else {
          var fcr = totalPakan / (ayamHidup * rataBerat);
        }

        // Hitung EEF
        percentMortality = (ayamMati / vm.totalAyam6)*100;  
        if (vm.date != 0 ) {
          if (fcr == 0) {
            var eef = 0
          } else {
            var eef = ((100 - percentMortality) * rataBerat * 100) / (fcr * vm.date);
          }

          vm.ip = eef;
          nilaiEef6.push(eef.toFixed(2));
        }     
           
      })      

    });
    vm.labels6 = tanggal6;
    vm.data6 = [nilaiEef6, standarEef];
  }

})();
