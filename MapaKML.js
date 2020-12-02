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
        var miMapa = this.map;
        var archivo = files[0];
        var ext = archivo.name.substr(archivo.name.lastIndexOf('.') + 1);

        if(ext != "kml"){
            alert("Formato de archivo incorrecto");
            return;
        } else{
            var lector = new FileReader();
            lector.onload = function (event) {
                var text = lector.result;
                var kml = $.parseXML(text);

                //Se abre el document y se corren los Placemark
                $("Document",kml).find("Placemark").each(function(){
                    var nombre = $("name", this).text();
                    var descripcion = $("description",this).text();
                    var coordHitos = $("LineString", this).find("coordinates").text();
                    
                    //Array con las coordenadas de los futuros hitos parseados
                    var posicionesPolyline = [];

                    //coordHitos[index] = coordHitos[index].trim();
                    var coordHitos = coordHitos.split("\t");
                    //Se parsean las coordenadas de cada hito
                    for (let index = 0; index < coordHitos.length; index++) {
                        if(coordHitos[index].length != 0){
                            var coordenadas = coordHitos[index].split(",");
                            var longitud = parseFloat(coordenadas[0]);
                            var latitud = parseFloat(coordenadas[1]);
                            var posicion = {lat:latitud, lng:longitud};
                            //Añadir punto al array de posiciones
                            posicionesPolyline.push(posicion);
                            //Se crea un nuevo marcador
                            var marcador = new google.maps.Marker({
                                position: posicion,
                                title: nombre,
                                map: miMapa
                            });
                            //Se crea un nuevo infoWindow
                            var indicador = new google.maps.InfoWindow({
                                content: nombre
                            });

                            //Se vincula al marcador para que aparezca al hacer click
                            marcador.indicador = indicador;
                            marcador.addListener("click", function(){
                                this.indicador.open(mapaKml.mapa, this);
                            });
                        }
                    }

                    //Se crea la polilínea correspondiente a la ruta
                    var linea = new google.maps.Polyline({
                        path:posicionesPolyline,
                        geodesic:true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });

                    linea.setMap(miMapa);
                });
            }

            //Por último, se lee el fichero
            lector.readAsText(archivo);
        }
    }
}
var mapaKml = new MapaKML();