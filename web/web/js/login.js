

let jwtToken = null;

// 쿠키 SET
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
}

// 쿠키 GET
function getCookie(name) {
    var cookie = document.cookie;
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for (var i = 0; i < cookie_array.length; i++) {
            var cookie_name = cookie_array[i].split("=");
            if (cookie_name[0] == name) {
                return cookie_name[1];
            }
        }
    }
    return;
}

// 세션 검사
function session_check_local() {
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href = 'index_login.html';
    }
}

// 아이디 자동 삽입 및 세션 체크
function init() {
    var emailInput = document.getElementById('typeEmailX');
    var idsave_check = document.getElementById('idSaveCheck');
    var get_id = getCookie("id");
    if (get_id && emailInput && idsave_check) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check_local();
}

// 세션 저장
function session_set_local() {
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX");
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("id", session_id.value);
        sessionStorage.setItem("pass", en_text);
    } else {
        alert("로컬 스토리지 지원 x");
    }
}

// 세션 삭제
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    }
}

// 로그아웃
function logout() {
    session_del();
    location.href = 'login.html';
}

// 로그인 입력값 검사 및 처리
function check_input() {
    var loginForm = document.getElementById('login_form');
    var emailInput = document.getElementById('typeEmailX');
    var passwordInput = document.getElementById('typePasswordX');
    if (!emailInput || !passwordInput) {
        alert("로그인 입력란을 찾을 수 없습니다.");
        return false;
    }

    if (emailInput.value.length === 0 || passwordInput.value.length === 0) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return false;
    }

    var emailValue = emailInput.value.trim();
    var passwordValue = passwordInput.value.trim();

    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }
    var hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue);
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    var hasUpperCase = /[A-Z]+/.test(passwordValue);
    var hasLowerCase = /[a-z]+/.test(passwordValue);
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    var idsave_check = document.getElementById('idSaveCheck');
    if (idsave_check && idsave_check.checked) {
        setCookie("id", emailValue, 1);
    } else {
        setCookie("id", "", 0);
    }

    // JWT 토큰 생성
    const payload = {
        id: emailValue,
        exp: Math.floor(Date.now() / 1000) + 3600 // 1시간(3600초)
    };
    jwtToken = generateJWT(payload);

    // 디버그용 출력
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    session_set_local(); // 세션 생성

    // JWT 토큰을 로컬스토리지에 저장
    localStorage.setItem('jwt_token', jwtToken);

    if (loginForm) {
        loginForm.submit();
    }
}

// 복호화 함수: 세션의 암호화된 값을 복호화하여 콘솔에 출력
function init_logined() {
    if (sessionStorage) {
        decrypt_text(); // 복호화 함수 호출
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// 모듈 환경에 맞는 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login_form')) {
        init();
        const loginBtn = document.getElementById("login_btn");
        if (loginBtn) {
            loginBtn.addEventListener('click', check_input);
        }
    }
});
