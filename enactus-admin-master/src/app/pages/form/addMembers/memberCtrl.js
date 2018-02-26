 (function () {
  'use strict';

  var config = {
          apiKey: "AIzaSyCqrzP4ql2kEl6qnduPbYCubNo8rbIsP3c",
          authDomain: "enactusadmin.firebaseapp.com",
          databaseURL: "https://enactusadmin.firebaseio.com",
          projectId: "enactusadmin",
          storageBucket: "enactusadmin.appspot.com",
          messagingSenderId: "609493992310"
      };
  
  angular.module('BlurAdmin.pages.form')
      .controller('memberCtrl', MemberCtrl);

  function MemberCtrl($scope, $window, $timeout, toastr) {
      $scope.model = {
        index: 0,
        email: null,
        name: null, 
        cargo: null,
        area: null,
        isAdm: null
      }
      
      $scope.members = [$scope.model];
     
      function newMember(modelo) {
        console.log(modelo)
        console.log(modelo.index)
        var newModel = {
          index: modelo.index + 1,
          email: null,
          name: null,
          cargo: null,
          area: null, 
          isAdm: null
        }
        return newModel
      }

      $scope.moreMembers = function() {
        $scope.members.push(newMember($scope.members));
      }

      $scope.removeMember = function() {
        $scope.members.splice(-1,1);
      }

      $scope.areas = [];
      var ref = firebase.database().ref().child('/Times/' + "Enactus UFAL").orderByChild('wordcount');
      ref.once('value',function(snap) {
          snap.forEach(function(item) {
              var itemVal = item.val();
              $scope.areas.push(itemVal);
              
          });
      });

      function generatePass() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var pass = "";

        for (let i = 0; i < 32; i++) {
          pass += chars[Math.floor(Math.random() * chars.length)];
        }

        return pass;
      }

      function createUser(email){
         firebase.auth().createUserWithEmailAndPassword(email, generatePass())
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
      }

      function sendEmail(email) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          toastr.success('Usuário criado com Sucesso!');
        }).catch(function(error) {
          toastr.error('Falha ao criar o usuário!');
        });
      }

      // var arrayAreas = $scope.areas.split(',');
      $scope.addMember = function(index) {
          var email = $scope.members[index].email;
          var name = $scope.members[index].name;
          var isAdm = $scope.members[index].isAdm;
          var area = $scope.members[index].area;
          // var cargo = $scope.members[index].cargo;
       
          console.log(area);
          
          // createUser(email);
          // sendEmail(email);
          // var memberInfos = [
          //   email: email,
          //   area: area,
          //   cargo: cargo,
          //   isAdm: isAdm
          // ];
          // firebase.database().ref("Times/" + "Enactus UFAL" + "/Users/" + name + "/").set(memberInfos);       
      };    
  }
})();

