
function encrypt_text(text) {

    return CryptoJS.AES.encrypt(text, "key").toString();
}

// 복호화 함수
function decrypt_text(cipher) {
    let bytes = CryptoJS.AES.decrypt(cipher, "key");
    return bytes.toString(CryptoJS.enc.Utf8);
}

// 세션에 객체 저장
function session_set() { // 세션 저장
    let id = document.querySelector("#typeEmailX");

    let now = new Date();
    const obj = {
        id: id.value,
        otp: now.getTime()
    };

    if (sessionStorage) {
        // 1. 객체 → JSON 문자열 변환
        const objString = JSON.stringify(obj);

        // 2. 암호화
        let en_text = encrypt_text(objString);

        // 3. 세션 스토리지에 저장
        sessionStorage.setItem("Session_Storage_id", id.value);           // 평문 id
        sessionStorage.setItem("Session_Storage_object", objString);      // 평문 JSON
        sessionStorage.setItem("Session_Storage_pass", en_text);          // 암호화된 JSON
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// 세션에서 객체 불러오기 (평문 JSON)
function session_get() {
    const str = sessionStorage.getItem("Session_Storage_object");
    if (str) {
        const obj = JSON.parse(str);
        return obj; 
    }
    return null;
}

// 세션에서 암호화된 객체 불러오기 및 복호화
function session_get_decrypted() {
    const cipher = sessionStorage.getItem("Session_Storage_pass");
    if (cipher) {
        const decrypted = decrypt_text(cipher);
        try {
            const obj = JSON.parse(decrypted);
            return obj;
        } catch (e) {
            console.error("복호화 또는 JSON 파싱 오류:", e);
            return null;
        }
    }
    return null;
}

// 세션 객체 삭제
function session_del() {
    sessionStorage.removeItem("Session_Storage_id");
    sessionStorage.removeItem("Session_Storage_object");
    sessionStorage.removeItem("Session_Storage_pass");
}

function session_check() {
    const obj = session_get();
    if (obj && obj.id) {
        alert("이미 로그인 되었습니다.");
        location.href = 'index_login.html';
    }
}


window.session_set = session_set;
window.session_get = session_get;
window.session_get_decrypted = session_get_decrypted;
window.session_del = session_del;
window.session_check = session_check;
