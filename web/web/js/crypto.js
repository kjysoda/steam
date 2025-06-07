function encodeByAES256(key, data) { // 암호화
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data) { // 복호화
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password) {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const b = password;
    const eb = encodeByAES256(rk, b);
    return eb;
}

function decrypt_text() {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const eb = session_get();
    const b = decodeByAES256(rk, eb);
    console.log(b);
}
