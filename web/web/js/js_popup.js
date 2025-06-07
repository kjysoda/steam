// 쿠키를 SET하는 함수 (보안 속성 추가)
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    // SameSite=None; Secure 속성 추가
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/; SameSite=None; Secure";
}

// 쿠키를 GET하는 함수
function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for (var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == name) {
                return cookie_name[1];
            }
        }
    }
    return;
}

// 팝업창 열기 (쿠키 체크)
function pop_up() {
    var cookieCheck = getCookie("popupYN");
    if (cookieCheck != "N") {
        window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
    }
}

// 팝업창 닫기
function close_window() {
    window.close();
}

// 체크박스 클릭 시 쿠키 설정 및 팝업 닫기
function closePopup() {
    var checkbox = document.getElementById('check_popup');
    if (checkbox && checkbox.checked) {
        setCookie("popupYN", "N", 1);
        console.log("쿠키를 설정합니다.");
        self.close();
    }
}

// 마우스 오버/아웃 이미지 변경
function over(obj) {
    obj.src = "image/logo.svg";
}
function out(obj) {
    obj.src = "image/logo2.png";
}

// 실시간 시계 표시
function show_clock() {
    let currentDate = new Date();
    let divClock = document.getElementById('divClock');
    let msg = "현재시간: ";
    if (currentDate.getHours() > 12) {
        msg += "오후";
        msg += (currentDate.getHours() - 12) + "시";
    } else {
        msg += "오전";
        msg += currentDate.getHours() + "시";
    }
    msg += currentDate.getMinutes() + "분";
    msg += currentDate.getSeconds() + "초";
    divClock.innerText = msg;

    if (currentDate.getMinutes() > 58) {
        divClock.style.color = "red";
    }
    setTimeout(show_clock, 1000);
}