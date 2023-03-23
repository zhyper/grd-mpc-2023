

var popup_view = document.getElementById('popup-view');


  mapboxgl.accessToken = 'pk.eyJ1Ijoiemh5cGVyIiwiYSI6ImNpdGdiM3d1dDAwODQyeG8zZGVkYnc2b24ifQ.cwgujm_x_QPQ668K2hTQFA';
  var map = new mapboxgl.Map({
    container: 'mapi3d',
    //style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 13,
      center: [-71.978774, -13.516732],
      // pitch: 65,
      // bearing: 20,
      //style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
      style: 'mapbox://styles/zhyper/ckxf3to4l0vvz15qd9z7o9n6b'
  });

    map.addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.FullscreenControl());
    
    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
    );



    map.on('load', function () {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.0 });

      // add a sky layer that will show when the map is highly pitched
      map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      // AGRUPACIONES URBANAS----------------------

      map.addSource('agrupaciones-urbanas-source',{
        type: 'vector',
        url: 'mapbox://zhyper.1fa9j7f0'
      })
      //
      map.addLayer({
        "id": "agrupaciones-urbanas-layer",
        "minzoom": 11,
        "paint": {
        //   "fill-color": "hsla(0, 92%, 39%, 0.75)",
        //   'fill-outline-color': "hsl(0, 0%, 100%)",
        //   'fill-opacity': 1.0,
        
          'line-color': 'rgba(252, 245, 187, 0.9)',
          
          'line-width': 0.8,
          'line-dasharray': [1, 0.5],
        },
        "type": "line",
        'source': 'agrupaciones-urbanas-source',
        'source-layer': 'huwgs84-a1gh5s',

        "layout": {
          "visibility": "visible"
        }
      });
      //  AGRUPACIONES LABELS *********************************************************************************
      map.addLayer({
        id: 'agrupaciones-urbanas-layer-label',
        minzoom: 14,
        type: 'symbol',
        source: 'agrupaciones-urbanas-source',
        'source-layer': 'huwgs84-a1gh5s',

        layout: {
          //"symbol-placement": "line",
          'text-font': ['Open Sans Regular'],
          'text-field': ['get', 'nombre'],
          'text-size': 9,
        },
        paint: {
          'text-color': 'rgba(252, 245, 187, 1.0)',
          'text-halo-color': 'rgba(0,0,0,.8)',
          'text-halo-width': 1.5,
        },
      });

      // RED HIDRICA*******************************************************************************************

      map.addSource('red-hidrica-prov-cusco-source', {
        type: 'vector',
        url: 'mapbox://zhyper.au4j0qfh'
      });
      //    vector
      map.addLayer({
        "id": "red-hidrica-prov-cusco-source-layer",
        "type": "line",
        "minzoom": 13,
        "source": 'red-hidrica-prov-cusco-source',
        "source-layer": "red-hidro-prov-cusco-WGS84-4z40dd",
        "paint": {
          'line-color': "rgba(37,213,248,1.0)",
          'line-width': 1.2,
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round",
        },


      });
      //  label
      map.addLayer({
        "id": "red-hidrica-prov-cusco-source-layer-label",
        "minzoom": 14,
        "type": "symbol",
        "source": 'red-hidrica-prov-cusco-source',
        "source-layer": "red-hidro-prov-cusco-WGS84-4z40dd",

        "layout": {
          "symbol-placement": "line",
          "text-font": ["Open Sans Bold"],
          'text-field': ['get', 'nombre'],
          "text-size": 10,
        },
        "paint": {
          "text-color": "rgba(37,213,248,1.0)",
          "text-halo-color": "rgba(0,0,0,.8)",
          "text-halo-width": 1,
        },

      });

      // BORDE URBANO *************************************************************************************
      map.addSource('border-urbano-pdu-2013-prov-cusco-source', {
        type: 'vector',
        url: 'mapbox://zhyper.dsuszr7h'
      });
      
      map.addLayer({
          "id": "border-urbano-pdu-2013-prov-cusco-layer",
          "minzoom": 11,
          "paint": {
              //"fill-color": "hsla(0, 92%, 39%, 0.75)", 
              'line-color': "hsl(0, 0%, 0%)",
              'line-width': 3.0,
              //'line-dasharray': [1, 0.5]
            },
            "type": "line",
            'source': 'border-urbano-pdu-2013-prov-cusco-source',
            'source-layer': 'borde_urbano__prop_pdu-1ow35f',
            
            "layout": {
                "visibility": "visible"
            }
        });

        // PDU 2013 - PELIGRO REMOSION DE MASA *************************************************************************************
        map.addSource('pdu-2013-peligro-remosion-masa-source', {
          type: 'vector',
          url: 'mapbox://zhyper.dj9bvnvo'
        });
        map.addLayer({
        "id": "pdu-2013-peligro-remosion-masa-layer",
        "minzoom": 11,
        "paint": {
            'fill-color':[
            //tipo de condicion
            'match',
            //setting el campo de referencia
            ['get','nivel'],
            //asignado las condiciones
            // 'BAJO', "rgba(140, 255, 0, 0.5)",
            'MEDIO', "rgba(250, 252, 177, 0.5)",
            'ALTO', "rgba(255, 200, 3, 0.5)",
            'MUY ALTO', "rgba(255, 11, 3, 0.5)",
            //default color
            'rgba(255, 255, 255, 0.1)'
          ],
          'fill-outline-color': "hsl(0, 0%, 100%)",
          'fill-opacity': 1.0,
        
          
        },
        "type": "fill",
        'source': 'pdu-2013-peligro-remosion-masa-source',
        'source-layer': 'pdu2013-PELIG-REMO-MASA-6gh4a7',

        "layout": {
          "visibility": "visible"
        }
      });


    
        // PDU 2013 - PELIGRO INUNDACION *************************************************************************************
    
        map.addSource('pdu-2013-peligro-inundacion-source', {
            type: 'vector',
            url: 'mapbox://zhyper.9pekiqfl'
        });
  
     
  
      map.addLayer({
          "id": "pdu-2013-peligro-inundacion-layer",
          "minzoom": 11,
          "paint": {
              'fill-color':[
              //tipo de condicion
              'match',
              //setting el campo de referencia
              ['get','nivel'],
              //asignado las condiciones
              'BAJO', "rgba(140, 255, 0, 0.5)",
              'MEDIO', "rgba(250, 252, 177, 0.5)",
              'ALTO', "rgba(255, 200, 3, 0.5)",
              'MUY ALTO', "rgba(255, 11, 3, 0.5)",
              //default color
              'rgba(255, 255, 255, 0.1)'
            ],
            'fill-outline-color': "hsl(0, 0%, 100%)",
            'fill-opacity': 1.0,
          
            
          },
          "type": "fill",
          'source': 'pdu-2013-peligro-inundacion-source',
          'source-layer': 'pdu2013-PELIG-INUNDACION-3b251j',
  
          "layout": {
            "visibility": "visible"
          }
        });



    });

    // After the last frame rendered before the map enters an "idle" state.
    map.on('idle', () => {
      // If these two layers were not added to the map, abort
    //   if (!map.getLayer('zonas41-layer') || !map.getLayer('zonas41-layer-ambito') || !map.getLayer('border-urbano-pdu-2013-prov-cusco-layer')) {
    //     return;
    //   }
      if ( !map.getLayer('border-urbano-pdu-2013-prov-cusco-layer')) {
        return;
      }

      // Enumerate ids of the layers.
      const toggleableLayers = [
        // { 
        //   id: 'zonas41-layer',
        //   title: 'Zonas',
        //   typeVector: 'fill-opacity',
        //   opacity: 80,
        //   active: 'active',
        // },
        // {
        //   id: 'zonas41-layer-ambito',
        //   title: 'Ambitos',
        //   typeVector: 'line-opacity',
        //   opacity: 80,
        //   active: 'active',
        // },
        {
          id: 'agrupaciones-urbanas-layer',
          title: 'Agrupaciones Urbanas',
          typeVector: 'line-opacity',
          opacity: 80,
          active: 'active',
        },
        {
          id: 'border-urbano-pdu-2013-prov-cusco-layer',
          title: 'Borde Urbano PDU',
          typeVector: 'line-opacity',
          opacity: 80,
          active: 'active',
        },
        {
          id: 'red-hidrica-prov-cusco-source-layer',
          title: 'Red Hídrica',
          typeVector: 'line-opacity',
          opacity: 80,
          active: 'active',
        },
        {
          id: 'pdu-2013-peligro-remosion-masa-layer',
          title: 'Peligro de deslizamiento',
          typeVector: 'fill-opacity',
          opacity: 80,
          active: 'active',
        },
        {
          id: 'pdu-2013-peligro-inundacion-layer',
          title: 'Peligro de inundacion',
          typeVector: 'fill-opacity',
          opacity: 80,
          active: 'active',
        },
        // {
        //   id: 'add-3d-buildings',
        //   title: 'Edificios 3D',
        //   typeVector: 'fill-extrusion-opacity',
        //   opacity: 80,
        //   active: '',
        // },

      ];

      //console.log('layers-menu: ',toggleableLayers);

      // Set up the corresponding toggle button for each layer.
      for (const layer of toggleableLayers) {
        // Skip layers that already have a button set up.
        if (document.getElementById(layer.id)) {
          continue;
        }

        //create Item-----------------------------------------
        const item = document.createElement('li');

        // Create a link Item---------------------------------
        const link = document.createElement('a');
        link.id = layer.id;
        link.href = '#';
        link.textContent = layer.title;
        link.className = layer.active;
        
        //create Icon Item:-----------------------------------
        const linkIcon = document.createElement('i');
        linkIcon.className = 'fas fa-map-marked-alt p-2';

        //create Range Item-----------------------------------
        var rangeOpacityInput = document.createElement("input");
        rangeOpacityInput.id= layer.id+"_";
        rangeOpacityInput.type = "range";
        rangeOpacityInput.value = "80";
        rangeOpacityInput.min="1";
        rangeOpacityInput.max="100";
        rangeOpacityInput.step="0.5";
        rangeOpacityInput.className = 'form-range range-layer-opacity';
        rangeOpacityInput.alt= 'Transparencia';


        rangeOpacityInput.addEventListener('input', (ev) => {
          // Adjust the layers opacity. layer here is arbitrary - this could
          // be another layer name found in your style or a custom layer
          // added on the fly using `addSource`.

          //const target = ev.target as HTMLInputElement;
          map.setPaintProperty(
          link.id,
          layer.typeVector,
          parseInt(ev.target.value, 10) / 100
          );
           
          // Value indicator
          //sliderValue.textContent = ev.target.value + '%';
          });
        

        //link.innerHTML =  link.innerHTML + "<i class='fas fa-map-marked-alt'>" ;
        link.appendChild(linkIcon);
        item.appendChild(link);
        item.appendChild(rangeOpacityInput);

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
          const clickedLayer = link.id;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.getLayoutProperty(
            clickedLayer,
            'visibility'
          );

          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            link.className = '';
          } else {
            link.className = 'active';
            map.setLayoutProperty(
              clickedLayer,
              'visibility',
              'visible'
            );
          }
        };

        const layers = document.getElementById('menu-layers');
        layers.appendChild(item);


      }
    });
    



    map.on('click', 'pdu-2013-peligro-remosion-masa-layer', (e) => {


        
        // Copy coordinates array.
        // const coordinates = e.features[0].geometry.coordinates.slice();
        const nivel = e.features[0].properties.nivel;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
        
        new mapboxgl.Popup()
        // .setLngLat(coordinates)
        .setLngLat(e.lngLat)
        // .setDOMContent(popup_view)
        .setHTML(nivel)
        .setMaxWidth("400px")
        .addTo(map);
  
  
      });

