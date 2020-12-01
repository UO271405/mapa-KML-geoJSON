"use strict";
class GeoJSON {
   initMap() {
        var centro = {lat: 41.650415, lng: -4.729053};
        this.map = new google.maps.Map(document.getElementById('mapa'),{
        zoom: 7,
        center: centro,
        mapTypeId: google.maps.MapTypeId.SATELLITE
        });
    }

   load(files) {
       var archivo = files[0];         
       var lector = new FileReader();
       var oThis = this;
       lector.onload = function(event) {
            var text = lector.result;
            var obj = JSON.parse(text);
            oThis.map.data.addGeoJson(obj);
        }
        lector.readAsText(archivo);
    }
}
var geoJSON = new GeoJSON();