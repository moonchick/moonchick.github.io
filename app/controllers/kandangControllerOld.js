(function(){
    'use strict';
  
    angular
      .module('appController')
      .controller('kandangController', kandangController)
      .filter('filterSuhu', function () {
        return function (input) {
  
          if (input == null)
            return 0;
          else if (input < 0 || input.match(/.*er/))
            return 'ERROR';
          else {
            input = parseFloat(input);
            return input.toFixed(2) + ' \xB0C';
          }
        }
      })
      .filter('filterBerat', function () {
        return function (input) {
          if (input == null)
            return 0;
          else if (input < 0 || input.match(/.*er/))
            return 'ERROR';
          else if (input == 0)
            return 0.00 + ' gr';
          else {
            input = parseFloat(input) * 3;
            return input.toFixed(2) + ' gr';
          }
        }
      })
      .filter('filterAmmonia', function () {
        return function (input) {
          if (input == null || input == 0)
            return 0;
          else if (input.match(/.*er/))
            return 'ERROR';
          else {
            var kalibrasi = Math.abs((-0.1545)*parseFloat(input)+26.664);
  
            return kalibrasi.toFixed(2) + ' ppm';
          }
        }
      })
      .filter('filterAngin', function () {
        return function (input) {
          if (input == null)
            return 0;
          else if (input < 0 || input.match(/.*er/))
            return 'ERROR';
          else {
            input = parseFloat(input);
            return input.toFixed(2) + ' km/jam';
          }
        }
      })
      .filter('filterHumidity', function () {
        return function (input) {
          if (input == null)
            return 0;
          else if (input < 0 || input.match(/.*er/))
            return 'ERROR';
          else {
            input = parseFloat(input);
            return input.toFixed(2) + ' %';
          }
        }
      }); 
  
    function kandangController($firebaseArray, $mdToast, $mdDialog, $scope) {
      var vm = this;
      
      // Data Kandang
      var ref_kandang = firebase.database().ref('grafik');
      vm.kandang = $firebaseArray(ref_kandang);
  
      // Data Grid
      var ref_grid = firebase.database().ref('kandangmirror/g');
      vm.grid = $firebaseArray(ref_grid);
  
      function hitung_rata() {
  
        var berat    = parseFloat(childSnapshot.val().a);
        var ammonia  = parseFloat(childSnapshot.val().b);
        var humidity = parseFloat(childSnapshot.val().c);
        var suhu     = parseFloat(childSnapshot.val().d);              
  
        if (berat > 0) {
          totalBerat += berat;
          countBerat++;
        }
  
        var kalibrasi = (-0.1545)*ammonia+26.664;
  
        if (kalibrasi > 0) {
          totalAmmonia += kalibrasi;
          countAmmonia++;
        }
  
        if (suhu > 0) {
          totalSuhu += suhu;
          countSuhu++;
        }
  
        if (humidity > 0) {
          totalHumidity += humidity;
          countHumidity++;
        }
  
        // Hitung Rata-Rata
        if (countBerat == 0) {
          vm.rerataBerat = 0;
        } else {
          vm.rerataBerat = (totalBerat / countBerat).toFixed(2);
        }
  
        if (countAmmonia == 0) {
          vm.rerataAmmonia = 0;
        } else {
          vm.rerataAmmonia = (totalAmmonia / countAmmonia).toFixed(2);
        }
  
        if (countHumidity == 0) {
          vm.rerataHumidity = 0;
        } else {
          vm.rerataHumidity = (totalHumidity / countHumidity).toFixed(2);
        }
  
        if (countSuhu == 0) {
          vm.rerataSuhu = 0;
        } else {
          vm.rerataSuhu = (totalSuhu / countSuhu).toFixed(2);
        }
  
        vm.rerataFeelsLike = feelsLike(vm.rerataHumidity, vm.rerataSuhu);
      }
  
      function feelsLike (rerataHumidity, rerataSuhu) {
        if (rerataHumidity < 50) {
          if (rerataSuhu == 0) {
            feelsLike = 0;
          } else if (rerataSuhu <= 29.0) {
            feelsLike = 24;
          } else if (rerataSuhu <= 30.2) {
            feelsLike = 25;
          } else if (rerataSuhu <= 31.3) {
            feelsLike = 26;
          } else if (rerataSuhu <= 32.5) {
            feelsLike = 27;
          } else if (rerataSuhu <= 33.7) {
            feelsLike = 28;
          } else if (rerataSuhu > 33.7) {
            feelsLike = 30;
          }
        } else if (rerataHumidity < 60) {
          if (rerataSuhu == 0) {
            feelsLike = 0;
          } else if (rerataSuhu <= 26.8) {
            feelsLike = 24;
          } else if (rerataSuhu <= 27.8) {
            feelsLike = 25;
          } else if (rerataSuhu <= 28.6) {
            feelsLike = 26;
          } else if (rerataSuhu <= 29.9) {
            feelsLike = 27;
          } else if (rerataSuhu <= 31.2) {
            feelsLike = 28;
          } else if (rerataSuhu > 31.2) {
            feelsLike = 30;
          }
        } else if (rerataHumidity < 70) {
          if (rerataSuhu == 0) {
            feelsLike = 0;
          } else if (rerataSuhu <= 24.8) {
            feelsLike = 24;
          } else if (rerataSuhu <= 25.7) {
            feelsLike = 25;
          } else if (rerataSuhu <= 26.7) {
            feelsLike = 26;
          } else if (rerataSuhu <= 27.7) {
            feelsLike = 27;
          } else if (rerataSuhu <= 28.9) {
            feelsLike = 28;
          } else if (rerataSuhu > 28.9) {
            feelsLike = 30;
          }
        } else if (rerataHumidity < 80) {
          if (rerataSuhu == 0) {
            feelsLike = 0;
          } else if (rerataSuhu <= 23.0) {
            feelsLike = 24;
          } else if (rerataSuhu <= 24.0) {
            feelsLike = 25;
          } else if (rerataSuhu <= 25.0) {
            feelsLike = 26;
          } else if (rerataSuhu <= 26.0) {
            feelsLike = 27;
          } else if (rerataSuhu <= 27.3) {
            feelsLike = 28;
          } else if (rerataSuhu > 27.3) {
            feelsLike = 30;
          }
        } else if (rerataHumidity >= 80) {
          if (rerataSuhu == 0) {
            feelsLike = 0;
          } else if (rerataSuhu <= 22.0) {
            feelsLike = 24;
          } else if (rerataSuhu <= 23.0) {
            feelsLike = 25;
          } else if (rerataSuhu <= 23.0) {
            feelsLike = 26;
          } else if (rerataSuhu <= 24.0) {
            feelsLike = 27;
          } else if (rerataSuhu <= 26.0) {
            feelsLike = 28;
          } else if (rerataSuhu > 26.0) {
            feelsLike = 30;
          }
        }
  
        return feelsLike;
      }
  
      function cluster() {
        dataset = vm.grid;
        var clustering = require('density-clustering');
        var dbscan = new clustering.DBSCAN();
        // parameters: 71.0 - neighborhood radius, 3 - number of points in neighborhood to form a cluster
        var clusters = dbscan.run(dataset, 71.0, 3);
        
        return dbscan.noise;
      }
  
      // Data Sensor
      var ref_sensor  = firebase.database().ref('kandangmirror/s');
      vm.sensor = $firebaseArray(ref_sensor);
  
      // Get Index
      vm.setKandang = function(index) {
        vm.idKandang = index;
      }
  
      vm.getKandang = function() {
         console.log(vm.idKandang);
        return function (grid) {
          return grid.idKandang === vm.idKandang;
        };
      }
  
      vm.setTanggal = function (tanggal) {
        var push, split;
  
        if (tanggal != null) {
          split = tanggal.split('-');
          tanggal = split[2] + '-' + split[1] + '-' + split[0];
        } else {
          tanggal  = null;
        }      
  
        return tanggal;
      }
  
      var ref_kandang1 = firebase.database().ref('grafik/kandang1/perhitungan');
      ref_kandang1.on('value', function (snapshot) {
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        var prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
  
        var updates = {};
        updates['grafik/kandang1/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      var ref_kandang2 = firebase.database().ref('grafik/kandang2/perhitungan');
      ref_kandang2.on('value', function (snapshot) {
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        var prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
  
        var updates = {};
        updates['grafik/kandang2/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      var ref_kandang3 = firebase.database().ref('grafik/kandang3/perhitungan');
      ref_kandang3.on('value', function (snapshot) {
        var prediksi;
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        if (suhu == 0 && kelembaban == 0 && amonia == 0) {
          prediksi = 0;
        } else {
          prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
        }      
  
        var updates = {};
        updates['grafik/kandang3/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      var ref_kandang4 = firebase.database().ref('grafik/kandang4/perhitungan');
      ref_kandang4.on('value', function (snapshot) {
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        var prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
  
        var updates = {};
        updates['grafik/kandang4/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      var ref_kandang5 = firebase.database().ref('grafik/kandang5/perhitungan');
      ref_kandang5.on('value', function (snapshot) {
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        var prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
  
        var updates = {};
        updates['grafik/kandang5/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      var ref_kandang6 = firebase.database().ref('grafik/kandang6/perhitungan');
      ref_kandang6.on('value', function (snapshot) {
        var suhu = snapshot.val().suhu;
        var kelembaban = snapshot.val().kelembapan;
        var amonia = snapshot.val().NH3;
        var prediksi = 22 + (suhu * -0.5367) + (0.118 * kelembaban) + (amonia * -0.0054);
  
        var updates = {};
        updates['grafik/kandang6/perhitungan/prediksi'] = prediksi.toFixed(0);
        firebase.database().ref().update(updates);
      });
  
      function beratColor (a, tgl) {
        if (tgl == vm.now) {
          if (a < 0 || a == 'ERROR')
            return 'indicator-red';
          else 
            return 'indicator-grey';
        } else {
          return '';
        }
        
      };
  
      function ammoniaColor (b, tgl) {
        var a = (-0.0357)*parseInt(b)+12.843;
  
        if (tgl == vm.now) {
          if (a > 20.00 || b == 'ERROR')
            return 'indicator-red';
          else 
            return 'indicator-grey';
        } else {
          return '';
        }
      };
  
      function humidityColor (c, tgl) {
        if (tgl == vm.now) {
          if ((c < 60 || c > 70)  || c == 'ERROR')
            return 'indicator-red';
          else 
            return 'indicator-grey';
        } else {
          return '';
        }
      };
  
      function temperatureColor (d) {
        if ((d < 10 || d > 35)  || d == 'ERROR')
          return 'indicator-red';
        else 
          return 'indicator-grey';
       
      };
  
      vm.sensorColor = function (a,b) {
        if ((a < 10 ) || (a > 35) || (b < 50)) 
          return 'sensor-indoor-red';
        else 
          return 'sensor-indoor-green';
      };
  
      vm.gridColor = function (a,b,c,d,e) {
        if ((a == null) || (b == null) || (c == null) || (d == null) || (a < 10)) 
          return 'footer-red';
        else 
          return 'footer-green';
      };
  
    }
  
  })();