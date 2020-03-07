jQuery(document).ready(function($) {
  $('#donation-graph').show();
  $.jqplot.config.enablePlugins = true;
  $.ajax({
    url: 'https://cha-ching.noisebridge.net/v1/donations/list/1m/json/noisetor',
    data: { },
    dataType: 'jsonp',
    cache: true,
    jsonpCallback: '_jqjsp',
    success: function(data) {
      var points = [[data.start, 0]];
      var total = 0;
      $.each(data.donations, function(i, donation) {
        total = total + donation.payment_gross;
        points.push([donation.payment_date, total]);
      });
      points.push([data.end, total]);
      var plot = $.jqplot('donation-graph', [points], {
        title: data.count + ' supporters have donated $' + Math.round(total) + ' this month!',
        axes: {
          xaxis: { renderer: $.jqplot.DateAxisRenderer, tickOptions: { formatString: '%Y-%m-%d' }, autoscale: true },
          yaxis: { tickOptions: { formatString: '$%d' }, autoscale: true }
        },
        series: [{ fill: true, fillToZero: true, showMarker: false }],
      });
    }
  });
});

