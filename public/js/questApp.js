angular.module("myApp", [
    'ngRoute',
    'ngAnimate',
    'googlechart'
]).
        config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'QuestCtrl'});
                $routeProvider.when('/survey', {templateUrl: 'partials/questions2.html', controller: 'QuestCtrl'});
                $routeProvider.otherwise({redirectTo: '/home'});
            }]).
        controller('HomeCtrl', function($scope,$location){
            $scope.startSurvey=function(){
                $location.path('/survey');
            }
            }).
        controller('QuestCtrl', function($scope,$http,$location){
           $scope.startSurvey=function(){
                $location.path('/survey');
            }
          $scope.emailModal=false;
          $scope.mailSent=false;
          $scope.userEmail='';
          $scope.getId=function(Q,C){
            return   ("Ans" + Q + C);
          };
          $scope.picked=false;
          $scope.radio={ value: undefined};
          $scope.viewChart={ value: 0};
          $scope.questions;
          $scope.results=[];
          $scope.qNum=0;
          $scope.makeNewChart=function(dataA, Quest){
              var data=dataA;
              console.log(data);
            return {
              "type": "PieChart",
              "data": data,
                      /*[
                        [
                          "Component",
                          "cost"
                        ],
                        [
                          "Software",
                          56907
                        ],
                        [
                          "Hardware",
                          54619
                        ],
                        [
                          "Services",
                          30212
                        ]
                      ],
                  */
              "options": {
                  "displayExactValues": true,
                  "width": 1000,
                  "height": 600,
                  "is3D": true,
                  //"title" : data[0][0],
                  
                  "chartArea": {
                    "left": 10,
                    "top": 10,
                    "bottom": 10,
                    "height": "100%",
                    "width": "100%"
                  }
                  
                },
               /* 
              "formatters": {
                "number": [
                  {
                    "columnNum": 1,
                    "pattern": "$ #,##0.00"
                  }
                ]
              }
                  */
            }
          };
          $scope.getRadioName=function(nam){
            return ("radio" + nam);
          };
          $scope.surveydata=[];
          
          /*
            //call this after questions successfully loaded, so nest in questions4.json call 
            $http.get('http://metroclick.us/vacation/getlist',$scope.questions).success(function(data) {
                console.log("successfull send");
                //assumes data is array of arrays of vote counts only and nothing else
                angular.forEach(data,function(v,k){
                    angular.forEach(v, function(value,key){
                        $scope.questions[k].choices[key][1]=value[1];
                        console.log($scope.questions[k].choices[key][1]);
                    });
                });
            });
          */


          $http.get('js/testdata.json').success(function(data) {
              $scope.surveydata=data;
              console.log($scope.surveydata);
              angular.forEach($scope.surveydata, function(value,key){
                  //console.log(value);
                  $scope[key]=[ [key ,"Votes" ]];
                  angular.forEach(value, function(v,k){
                     $scope[key].push([k,v]);
                  });
                  //console.log($scope[key]);
              });
              console.log($scope);
              
             $scope.chart=$scope.makeNewChart($scope.q1); 
             console.log($scope.chart.data);
          });
           
          
          $http.get('js/questions5.json').success(function(data) {
          /*$http.get('http://metroclick.us/vacation/getlist',$scope.questions).success(function(data) {
                console.log("successfull send");
            });
           */
              $scope.questions=data.qs;
              console.log($scope.questions);

              //init initial chart data
             var topArr=[["Answers", "Votes"]];
             var subdata=$scope.questions[0].choices;
             var dataToChart=topArr.concat(subdata);
             var title=$scope.questions[0].quest;
             console.log(dataToChart);
             $scope.chart=$scope.makeNewChart(dataToChart,title);
          });
          
          
          $scope.getSliderName=function(value){
            return ('slider' + value)  ;
          };
          
          $scope.pic=[true,false,false,false,false,false];
          
          var shiftPic=function(){
              var shifted= $scope.pic.shift();
              $scope.pic.push(shifted);
          };
          
          $scope.$watch('viewChart.value', function() {
                //commented out for separate data files
                /*
                console.log($scope.viewChart.value);
                $scope.chart.data=  $scope["q" + ($scope.viewChart.value + 1)];
                $scope.chart.options.title="q" + ($scope.viewChart.value + 1);
                console.log("watched");
              */
             var arr = [["Answers", "Votes"]];
             var q=$scope.questions[$scope.viewChart.value].quest;
             var y= $scope.questions[$scope.viewChart.value].choices;
             var newData=arr.concat(y);
             console.log(newData);
             $scope.chart.data = arr.concat(y);
             //show question outside of cahrt
             //$scope.chart.options.title=q;
          });
         
          $scope.makeActive=function(ques, ch){
              console.log("var ques is " + ques);
              console.log("var ch is " + ch);
              $scope.picked=true;
              /*
              $scope["radio" + ques]=ch;
              console.log($scope["radio" + ques]);
              */
          };
          $scope.topQ=function(tQuest){
              return tQuest;
          };
          
          $scope.finishMail=function(){
              
              $scope.emailModal=false;
          };
          
          $scope.sendTheMail=function(){
               var m = new mandrill.Mandrill('C7LDjR0CdMlYzu12b4zGEg');
               var params = {
                    "message": {
                        "from_email": "edd0416@aol.com",
                        "to": [],
                        "subject": " 20% off Biolage at Vito Mazza Salon",
                        "html": "<p> Results from survey</p>"
                    }
                };
               params.message.to.push({'email': $scope.userEmail})
               m.messages.send(params, function(res) {
                        console.log(res);
               });                        
              $scope.mailSent=true;
              $scope.emailModal=false;
          };
          $scope.submitChoice=function(){
              $scope.picked=false;
              var res=[];
              res.push([$scope.qNum, $scope.radio.value]);
           
              console.log($scope.qNum);
              console.log($scope.radio.value);
              $scope.results.push(res);
              //use results array to now sebd to backend
              console.log($scope.results);

              //test to pop up emailmodal
              if($scope.qNum==7){
                  console.log("qNum is 37");
                  //pop upmodal for email here
                  $scope.emailModal=true;
                  
              }

              //
              console.log([$scope.radio.value]);
              console.log($scope.questions[$scope.qNum].choices[$scope.radio.value][1]);
              //following line alters data on questions3.json
              // to be used t omake graph and resubmit back to server
              $scope.questions[$scope.qNum].choices[$scope.radio.value][1]++;
              console.log($scope.questions[$scope.qNum].choices[$scope.radio.value][1]);
              
              $scope.qNum++;
              $scope.radio.value=undefined;
              //post data back to server
              //NOW need to change what is sent back
              //$scope.results array???
              if($scope.qNum==8){

//or send following...
//var resultObj= { "res": $scope.results};
//this just send question number and answer but not total results
//need to be sent back all updated answers from server


//or send following...
//this will make an object of nested arrays of numbers only
//var tempArrToSend=[];
//var qArr=[];
//angular.forEach($scope.questions, function(v,k){
//    qArr=[];
//    angular.forEach(v.choices, function(value,key){
//      qArr[key]=value[1];
//    });
//  tempArrToSend.push(qArr);
//});
//console.log(tempArrToSend);
//var resultObj= {"res": tempArrToSend};


                $http.post('http://api.metroclick.us/vacation/update', $scope.questions).
                  success(function(data) {
                  console.log("successfull send");
                  })
                  .error(function(data, status, headers, config) {
                    console.log('post error');
                    console.log('data');
                    console.log(data);
                    console.log('status');
                    console.log(status);
                    console.log('headers');
                    console.log(headers);
                    console.log('config');
                    console.log(config);
                });
              }
           shiftPic();   
          };

          $scope.resetQuestions=function(){
            $scope.results=[];
            $scope.qNum=0;
            $scope.viewChart={ value: 0};
            $scope.mailSent=false;
            $scope.emailModal=false;
          };
          $scope.getChartNum=function(chNum){
            return ("chartq" + (chNum + 1));
          };
          $scope.getRadioChoiceLabel=function(index){
              return ("Q" + (index+1));
          }
        });
//ngidle???


