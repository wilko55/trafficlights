function TrafficLight(serviceData) {
  this.frequency = serviceData.frequencyInSeconds;
  this.name = serviceData.service;
  this.url = serviceData.url;
  this.historySize = 120000 / (serviceData.frequencyInSeconds * 1000);
  this.history = [];

  this.renderTrafficLight = function(containerId) {
    var trafficLight = `
    <div class="large-3 columns end traffic-light-container">
      <span>` + this.name + `</span>
      <div class="traffic-light">
        <div id="` + this.name + `-green" class="light green"></div>
        <div id="` + this.name + `-red" class="light red"></div>
      </div>
      <span class="status">Current status: <span id="` + this.name + `-status"></span></span>
    </div>`
    document.getElementById(containerId).innerHTML += trafficLight;
  }

  this.updateHistory = function(status) {
    if (this.history.length >= this.historySize) {
      this.history.shift();
    }
    this.history.push(status);
  }

  this.toggleLight = function(colourOn, colourOff) {
    $('#' + this.name + '-' + colourOff).removeClass(colourOff + '-on');
    $('#' + this.name + '-' + colourOn).addClass(colourOn + '-on');
    colourOn === 'red' ? $('#' + this.name + '-red').addClass('blink') : $('#' + this.name + '-red').removeClass('blink');
  }

  this.updateLights = function() {
    var count = 0;
    this.history.forEach(function(el) {
      if (el !== 200) {
        count += 1;
      }
    })
    // check whether > 3 statuses within the last 2 minutes are not 200
    // before there are < 3 statuses, the light shown will be based the latest status check
    if (this.history.length > 3) {
      count < 3 ? this.toggleLight('green', 'red') : this.toggleLight('red', 'green');
    } else {
      this.history[this.history.length-1] === 200 ? this.toggleLight('green', 'red') : this.toggleLight('red', 'green');
    }
  }

  this.checkUrl = function(instanceData) {
    $.ajax({
        url: instanceData.url,
        dataType: 'jsonp'
      })
      .complete((urlData) => {
        document.getElementById(instanceData.name + '-status').innerHTML = urlData.status;
        instanceData.updateHistory(urlData.status);
        instanceData.updateLights();
      })
  }

  this.watch = function() {
    var instanceData = this;
    instanceData.checkUrl(instanceData)
    var startWatch = setInterval(
      () => {
        instanceData.checkUrl(instanceData)
      }, this.frequency * 1000
    )
  }
}
