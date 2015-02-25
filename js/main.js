
var map;
var menu_slide_duration = 300;
var logo_container = '.logo img';
var days_menu_items = '.days-menu-items';
var options_menu_items = '.options-menu-items';

init();

function init() {

	loadMap();
	loadMenus();
	logoOnClick();
	createModals();
	makeMapResponsive();
	
}

/* |||||||||||||| FUNCTION DECLARATIONS |||||||||||||| */

// TOGGLE MENU ON CLICK
function menuSlideOnClick(button, navigation, slide_duration) {
	$(button).click(function(){
		$(navigation).toggle(slide_duration);
	});
}

//SET UP SLIDE MENUS
function setUpSlideMenus() {
	$(menuSlideOnClick('.days-btn', days_menu_items, menu_slide_duration));
	$(menuSlideOnClick('.options-btn', options_menu_items, menu_slide_duration));
}

// OPEN MENUS
function loadMenus() {
	setUpSlideMenus();
	setTimeout(function() {
		$('.days-btn').click();
		$('.options-btn').click();
	},2500);
}

// LOAD MAP
function loadMap() {
	// Map Options
	var map_options = {
		center: {lat:-36.8495452,lng:174.7669572},
		zoom: 15,
		scrollwheel:true,
		disableDefaultUI: true,
		styles: [
			{
				featureType:'poi',
				stylers: [
					{ visibility:'off' }
				]
			},
			{	
				featureType:'poi.park',
				stylers: [
					{ visibility:'on' }
				]
			}
		]
	};

	// Add the Map with the options
	map = new google.maps.Map(document.getElementById('map'), map_options);
}

// LOAD MARKERS
function loadMarkers() {
	map.data.loadGeoJson('js/markers.json');
	map.data.setStyle(function(feature) {
		return {icon:feature.getProperty('icon')};
	});
}

//SHOW MARKERS
function showMarkers() {
	map.data.setStyle({ visible:true });
}

// HIDE MARKERS
function hideMarkers() {
	map.data.setStyle({ visible:false });
}

// MAP HAS MARKERS
function mapHasMarkers() {
	return false;
}

//SHOW MENUS
function showMenus() {
	if ( $(days_menu_items).css(display) == 'none' ) {
		$(days_menu_items).toggle(menu_slide_duration)
	}
	if ( $(options_menu_items).css(display) == 'none' ) {
		$(options_menu_items).toggle(menu_slide_duration)
	}
}

//HIDE MENUS
function hideMenus() {
	$(days_menu_items).slideUp(menu_slide_duration);
	$(options_menu_items).slideUp(menu_slide_duration);
}

// SHOW ALL MARKERS AND HIDE MENUS
function logoOnClick() {
	$(logo_container).click(function() {
		if ( mapHasMarkers() ) {
			hideMarkers();
			showMenus();		
		} else {
			showMarkers();
			hideMenus();
		}
	});
}

// CREATE MODALS
function createModals() {
	map.data.addListener('click',function(event) {
		var window_content = event.feature.getProperty('description');
		var info_window = new google.maps.InfoWindow();
		info_window.setContent(window_content);
		info_window.setPosition(event.latLng);
		info_window.setOptions({pixelOffset: new google.maps.Size(-1,-90)});
		info_window.open(map);
	});
}

// MAKE MAP RESPONSIVE
function makeMapResponsive() {
	google.maps.event.addDomListener(window,'resize', function(){
		var center = map.getCenter();
		google.maps.event.trigger(map,'resize');
		map.setCenter(center);
	});
}
