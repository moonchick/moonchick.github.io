(function(){
  'use strict';

  angular
    .module('appController')
    .controller('mortalityController', mortalityController);

  function mortalityController() {
    var vm = this;
    var tanggal = [];
    var mortalitasHarian = [];
    var mortalitasTotal  = [];
    var mortalitasBatas  = [];

    var total = 0;
    var count = 0;
    var batasCount = 0;

    var refSetting = firebase.database().ref().child('setting');  
    refSetting.on("value", function (snapshot) {
      vm.totalAyam1 = snapshot.val().jumlahAwalAyamLantai1;
      vm.totalAyam2 = snapshot.val().jumlahAwalAyamLantai2;
      vm.totalAyam3 = snapshot.val().jumlahAwalAyamLantai3;
      vm.totalAyam4 = snapshot.val().jumlahAwalAyamLantai4;
      vm.totalAyam5 = snapshot.val().jumlahAwalAyamLantai5;
      vm.totalAyam6 = snapshot.val().jumlahAwalAyamLantai6;
    });  

    var refMortality = firebase.database().ref('grafik/kandang1/feedandmortality');
    refMortality.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal.push(tgl);
          }

          mortalitasHarian.push(ayamMati);
          count++;
          total += ayamMati;
          mortalitasTotal.push(total);
        });

        for (var i=0; i <= count-1; i++) {
          var batasCount = (vm.totalAyam1 * 2)/100;
          mortalitasBatas.push(batasCount);
        }
      });

    vm.labels = tanggal;
    vm.data = [mortalitasHarian, mortalitasTotal, mortalitasBatas];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.colors = ['#3399ff', '#FFC400', '#FF1744'];
    vm.datasetOverride = [
      {
        label: 'Daily Mortality',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
      {
        label: 'Total Mortality',
        borderWidth: 3,
        type: 'line',
        fill: false,
        pointRadius: 5,
        pointHitRadius: 15
      },
      {
        label: 'Boundary',
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
            labelString: 'Ayam Mati (ekor)'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 450,
            stepSize: 90
          }
        }]
      } 
    };

    //2
    var tanggal2 = [];
    var mortalitasHarian2 = [];
    var mortalitasTotal2  = [];
    var mortalitasBatas2  = [];
    var total2 = 0;
    var count2 = 0;
    var batasCount2 = 0;
    var refMortality2 = firebase.database().ref('grafik/kandang2/feedandmortality');
    refMortality2.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal2.push(tgl);
          }

          mortalitasHarian2.push(ayamMati);
          count2++;
          total2 += ayamMati;
          mortalitasTotal2.push(total2);
        });

        for (var i=0; i <= count2-1; i++) {
          var batasCount = (vm.totalAyam2 * 2)/100;
          mortalitasBatas2.push(batasCount);
        }
      });
    vm.labels2 = tanggal2;
    vm.data2 = [mortalitasHarian2, mortalitasTotal2, mortalitasBatas2];

    //3
    var tanggal3 = [];
    var mortalitasHarian3 = [];
    var mortalitasTotal3  = [];
    var mortalitasBatas3  = [];
    var total3 = 0;
    var count3 = 0;
    var batasCount3 = 0;
    var refMortality3 = firebase.database().ref('grafik/kandang3/feedandmortality');
    refMortality3.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal3.push(tgl);
          }

          mortalitasHarian3.push(ayamMati);
          count3++;
          total3 += ayamMati;
          mortalitasTotal3.push(total3);
        });

        for (var i=0; i <= count3-1; i++) {
          var batasCount = (vm.totalAyam3 * 2)/100;
          mortalitasBatas3.push(batasCount);
        }
      });
    vm.labels3 = tanggal3;
    vm.data3 = [mortalitasHarian3, mortalitasTotal3, mortalitasBatas3];

    //4
    var tanggal4 = [];
    var mortalitasHarian4 = [];
    var mortalitasTotal4  = [];
    var mortalitasBatas4  = [];
    var total4 = 0;
    var count4 = 0;
    var batasCount4 = 0;
    var refMortality4 = firebase.database().ref('grafik/kandang4/feedandmortality');
    refMortality4.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal4.push(tgl);
          }

          mortalitasHarian4.push(ayamMati);
          count4++;
          total4 += ayamMati;
          mortalitasTotal4.push(total4);
        });

        for (var i=0; i <= count4-1; i++) {
          var batasCount = (vm.totalAyam4 * 2)/100;
          mortalitasBatas4.push(batasCount);
        }
      });
    vm.labels4 = tanggal4;
    vm.data4 = [mortalitasHarian4, mortalitasTotal4, mortalitasBatas4];

    //5
    var tanggal5 = [];
    var mortalitasHarian5 = [];
    var mortalitasTotal5  = [];
    var mortalitasBatas5  = [];
    var total5 = 0;
    var count5 = 0;
    var batasCount5 = 0;
    var refMortality5 = firebase.database().ref('grafik/kandang5/feedandmortality');
    refMortality5.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal5.push(tgl);
          }

          mortalitasHarian5.push(ayamMati);
          count5++;
          total5 += ayamMati;
          mortalitasTotal5.push(total5);
        });

        for (var i=0; i <= count5-1; i++) {
          var batasCount = (vm.totalAyam5 * 2)/100;
          mortalitasBatas5.push(batasCount);
        }
      });
    vm.labels5 = tanggal5;
    vm.data5 = [mortalitasHarian5, mortalitasTotal5, mortalitasBatas5];

    //6
    var tanggal6 = [];
    var mortalitasHarian6 = [];
    var mortalitasTotal6  = [];
    var mortalitasBatas6  = [];
    var total6 = 0;
    var count6 = 0;
    var batasCount6 = 0;
    var refMortality6 = firebase.database().ref('grafik/kandang6/feedandmortality');
    refMortality6.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var date = childSnapshot.key;
          var split = date.split('-');

          var tgl = split[2] + '-' + split[1] + '-' + split[0];
          
          var ayamMati = childSnapshot.val().ayamMati;

          if (ayamMati != null) {
            tanggal6.push(tgl);
          }

          mortalitasHarian6.push(ayamMati);
          count6++;
          total6 += ayamMati;
          mortalitasTotal6.push(total6);
        });

        for (var i=0; i <= count6-1; i++) {
          var batasCount = (vm.totalAyam6 * 2)/100;
          mortalitasBatas6.push(batasCount);
        }
      });
    vm.labels6 = tanggal6;
    vm.data6 = [mortalitasHarian6, mortalitasTotal6, mortalitasBatas6];
    
  }

})();
