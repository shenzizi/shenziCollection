// var styles = {
//     default: null,
//     hide: [{
//         featureType: 'poi',
//         stylers: [{
//             visibility: 'off'
//         }]
//     }, {
//         featureType: 'transit.station',
//         elementType: 'labels.text.fill',
//         stylers: [{
//             color: '#9E1818'
//         }]
//     }, {
//         featureType: 'road',
//         // elementType: 'geometry.stroke',
//         stylers: [{
//             visibility: 'off'
//         }]
//     }]
// };

var map_styles_zoom14 = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#333333"
    }, {
        "lightness": 40
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "hue": "#ff8000"
    }, {
        "saturation": "67"
    }, {
        "weight": "5.79"
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "off"
    }, {
        "color": "#f4dcdc"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "off"
    }],
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "off"
    }],
}, {
    "featureType": "road.highway",
    "stylers": [{
        visibility: 'off'
    }]

}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    // "stylers": [{
    //     "color": "#ffffff"
    // }, {
    //     "lightness": 18
    // }]
    "stylers": [{
        visibility: 'on'
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
},{
    featureType: 'transit.line',
        stylers: [{
             visibility: 'off'
        }]
},{
    featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#D46673'
        }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e9e9e9"
    }, {
        "lightness": 17
    }]
}];


var map_styles_zoom15 = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#333333"
    }, {
        "lightness": 40
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "hue": "#ff8000"
    }, {
        "saturation": "67"
    }, {
        "weight": "5.79"
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#f4dcdc"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }],
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "off"
    }],
}, {
    "featureType": "road.highway",
    "stylers": [{
        visibility: 'off'
    }]

}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    // "stylers": [{
    //     "color": "#ffffff"
    // }, {
    //     "lightness": 18
    // }]
    "stylers": [{
        visibility: 'on'
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
},{
    featureType: 'transit.line',
        stylers: [{
            "color":"#6FDBB9"
        },{
            "lightness":10
        }]
},{
    featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#D46673'
        }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e9e9e9"
    }, {
        "lightness": 17
    }]
}];

var map_styles_zoom16 = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#333333"
    }, {
        "lightness": 40
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "hue": "#ff8000"
    }, {
        "saturation": "67"
    }, {
        "weight": "5.79"
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#f4dcdc"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }],
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "on"
    }],
}, {
    "featureType": "road.highway",
    "stylers": [{
        visibility: 'on'
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    // "stylers": [{
    //     "color": "#ffffff"
    // }, {
    //     "lightness": 18
    // }]
    "stylers": [{
        visibility: 'on'
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
},{
    featureType: 'transit.line',
        stylers: [{
            "color":"#6FDBB9"
        },{
            "lightness":10
        }]
},{
    featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#D46673'
        }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e9e9e9"
    }, {
        "lightness": 17
    }]
}];

