;(function () {
    'use strict'

    angular.module('appController').controller('userController', userController)

    function userController($firebaseAuth, $scope, $state) {
        var ref = firebase.database().ref('admin/')

        $scope.addAdmin = function () {
            var email = $scope.user.email + '@gmail.com'
            var password = $scope.user.password

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function (authData) {
                    firebase
                        .database()
                        .ref('admin/' + authData.uid)
                        .set({
                            nama: $scope.user.nama,
                            role: 'petugas',
                        })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    // ...
                })
        }

        $scope.login = function () {
            var email = $scope.user.email + '@gmail.com'
            var password = $scope.user.password
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function () {
                    console.log('Logged In ' + $scope.user.email)
                    $state.go('menu.home')
                })
                .catch(function (err) {
                    var errorCode = err.code
                    var errorMessage = err.message
                    if (errorCode === 'auth/user-not-found') {
                        alert(
                            'Username yang anda masukkan salah. Silahkan isi kembali'
                        )
                    } else if (errorCode === 'auth/wrong-password') {
                        alert('Password salah. Silahkan isi kembali')
                    } else {
                        alert(errorMessage)
                    }
                })
        }

        $scope.logout = function () {
            firebase
                .auth()
                .signOut()
                .then(
                    function () {
                        console.log('Successfully Logout')
                        $state.go('login')
                    },
                    function (error) {}
                )
        }

        $scope.correlation = function () {
            window.open('https://chicken-soul-cl.herokuapp.com/', '_blank')
        }
    }
})()
