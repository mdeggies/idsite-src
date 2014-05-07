'use strict';

angular.module('stormpathIdpApp')
  .controller('ForgotCtrl', function ($scope,Stormpath) {
    $scope.sent = false;
    $scope.fields = {};
    $scope.submit = function(){
      $scope.notFound = false;
      var inError = Object.keys($scope.fields).filter(function(f){
        return $scope.fields[f].validate();
      });
      if(inError.length>0){
        return;
      }
      Stormpath.sendPasswordResetEmail($scope.fields.email.value,function(err){
        if(err){
          if(err.status===404){
            $scope.notFound = true;
          }else{
            $scope.unknownError = err;
          }
        }else{
          $scope.sent = true;
        }
      });
    };
  });
