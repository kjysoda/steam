// 지도 영역 div
var mapContainer = document.getElementById('map');
var mapOption = {
    center: new kakao.maps.LatLng(37.379732, 126.927643),
    level: 3 // 확대 레벨
};

// 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

// 마커 생성 및 표시
var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
var marker = new kakao.maps.Marker({
    position: markerPosition
});
marker.setMap(map);

// 클릭한 위치로 마커 이동 + 위경도 출력
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    var latlng = mouseEvent.latLng;
    marker.setPosition(latlng);
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    var resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;
});
