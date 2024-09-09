// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);

// Create Temperature Gauge
var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-temperature',
  width: 120,
  height: 400,
  units: "Temperature C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 50,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "10",
      "20",
      "30",
      "40",
      "50"

      
 
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();
  
// Create Humidity Gauge
var gaugeHum = new RadialGauge({
  renderTo: 'gauge-humidity',
  width: 300,
  height: 300,
  units: "Humidity (%)",
  minValue: 0,
  maxValue: 300,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "50",
      "100",
      "150",
      "200",
      "250",
      "300"

  ],
  minorTicks: 5,
  strokeTicks: true,
  highlights: [
      {
          "from": 250,
          "to": 300,
          "color": "#a7028b8a"
      }
      

  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      var temp = myObj.temperature;
      var hum = myObj.humidity;
      gaugeTemp.value = temp;
      gaugeHum.value = hum;
    }
  }; 
  xhr.open("GET", "/readings", true);
  xhr.send();
}




    
    

    function fetchData() {
      gaugeTemp.value = data.temperature;
      gaugeHum.value = data.aqi;
      fetch('/data')
      
      .then(response => response.json())
      .then(data => {
        
          document.getElementById('temperature').textContent = data.temperature;
          document.getElementById('humidity').textContent = data.humidity;
          document.getElementById('mq2Value').textContent = data.mq2Value;
          document.getElementById('aqi').textContent = data.aqi;
          document.getElementById('airQuality').textContent = data.airQualityStatus;
          
          
          const healthStatus = document.getElementById('healthStatus');
          healthStatus.textContent = data.healthStatus;
          if (data.healthStatus === 'خوب') {
              healthStatus.className = 'healthy';   
          } else {
              healthStatus.className = 'unhealthy';
          }
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  setInterval(fetchData, 10000);
  fetchData();