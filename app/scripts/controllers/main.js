'use strict';

(function() {
  /**
   * @ngdoc function
   * @name mainStarterApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the mainStarterApp
   */
  var app = angular.module('mainStarterApp', []);

  app.run(function(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
      errorMessages.tooYoung = 'You must be at least {0} years old to use this site';
      errorMessages.tooOld = 'You must be max {0} years old to use this site';
      errorMessages.badUsername = 'Username can only contain numbers and letters and _';
    });
  });

  app.controller('FormSubmitCtrl', function ($scope, $http) {
    var that = this;

    that.formModel = {};
    that.submitting = false;
    that.submitted = false;
    that.hasError = false;

    that.onSubmit = function () {
      that.submitting = true;
      console.log('submitted!');
      console.log(that.formModel);

      var postForm = $http.post('https://minmax-server.herokuapp.com/register/', that.formModel);

      postForm.then(function (response) {
        that.response = response.data;

        console.log('success');
        that.submitting = false;
        that.submitted = true;
        that.hasError = false;
      }, function (response){
        console.log('error');
        that.submitting = false;
        that.submitted = false;
        that.hasError = true;
      });

    };
  });
})();
