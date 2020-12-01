"use strict";
class MapaKML {

    initMap() {
        var centro = {lat: 43.3672702, lng: -5.8502461};
    this.map = new google.maps.Map(document.getElementById('mapa'),{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.SATELLITE
        });
    }

    load(files) {
        var archivo = files[0];
        var tipo = "application/vnd.google-earth.kml+xml"

        var parser = new geoXML3.parser({
            map: this.map,
            singleInfoWindow: true,
            afterParse: this.useTheData
        });

        if (archivo.type == tipo) {
            var lector = new FileReader();
            lector.onload = function (event) {
                var text = lector.result;

                parser.fetchXML = function (url, callback) {
                    function timeoutHandler() {
                        callback();
                    };
                    $.ajax({
                        type: "GET",
                        url: url,
                        success: function (xml) {
                            callback(xml);
                        }
                    });
                };
                parser.parseKmlString(text);
            }
            lector.readAsText(archivo);
        }
    }
}

var kml = new MapaKML();