const nameRegex = /^[가-힣]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
import { session_set2 } from './session.js';

// 회원가입 정보 클래스
class SignUp {
    constructor(name, email, password, re_password) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._re_password = re_password;
    }

    setUserInfo(name, email, password, re_password) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._re_password = re_password;
    }

    getUserInfo() {
        return {
            name: this._name,
            email: this._email,
            password: this._password,
            re_password: this._re_password
        };
    }
}

// 회원가입 함수
function join() {
    let form = document.querySelector("#join_form");
    let name = document.querySelector("#joinName");
    let email = document.querySelector("#joinEmail");
    let password = document.querySelector("#joinPassword");
    let re_password = document.querySelector("#joinPassword2");
    let agree = document.querySelector("#joinAgree"); // 약관 동의 체크박스 id

    // 비밀번호 검사
    if (!pwRegex.test(password.value)) {
        alert("비밀번호는 8자 이상이며 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
        password.focus();
        return;
    }
    // 비밀번호 일치 검사
    if (password.value !== re_password.value) {
        alert("비밀번호가 일치하지 않습니다.");
        re_password.focus();
        return;
    }
    // 약관 동의 확인
    if (!agree.checked) {
        alert("약관에 동의하셔야 가입이 가능합니다.");
        return;
    }

    // 회원가입 객체 생성 및 세션 저장, 폼 제출
    const newSignUp = new SignUp(
        name.value,
        email.value,
        password.value,
        re_password.value
    );
    session_set2(newSignUp);
    form.submit();
}

document.getElementById("join_btn").addEventListener('click', join);
