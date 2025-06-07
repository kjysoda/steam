var close_time; // 타이머 객체 저장용 변수
var close_time2 = 50; // 10초 카운트다운

clearTimeout(close_time); // 혹시 이전 타이머가 있으면 정지
close_time = setTimeout(close_window, 50000); // 10초 후 창 닫기

show_time(); // 카운트다운 시작

function show_time() {
    let divClock = document.getElementById('Time');
    divClock.innerText = close_time2; // 남은 시간 표시
    close_time2--; // 1초 감소
    if (close_time2 >= 0) {
        setTimeout(show_time, 1000); // 1초 후 재호출
    }
}

function close_window() {
    window.close(); // 팝업창 닫기
}