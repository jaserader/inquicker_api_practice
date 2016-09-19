import $ from 'jquery';

var jsonpData;
var clinic;
var template;
var times;
var time;
var finalData;

$.get( 'template/template.html', function(data){
  template = data;
});

var processTemplate = function() {
  var rendered = Mustache.render( template, finalData );
  $( '#template-output' ).append( rendered );
};

$.ajax({
  url: 'https://api.inquickerstaging.com/v2/schedules?api_key=c874c82cea1d3cdd29e0e609b9c601909cf818f7&facilities=womens-health-of-tennessee',
  type: 'GET',
  dataType: 'jsonp',
  success: function(data){
    if(data){
      jsonpData = data.data;
      setupData();
    }
  },
  error: function(e) {
  }
});

function setupData(){

  jsonpData.forEach(
    function(arrayItem){
      clinic = arrayItem;

      arrayItem.availableTimes.forEach(
        function(arrayTimes){
          time = arrayTimes;
        }
      );

      finalData = $.extend( clinic, time );
      console.log(finalData);

      processTemplate();

    }
  );
}
