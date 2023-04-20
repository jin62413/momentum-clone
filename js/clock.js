const clock = document.querySelector("h2#clock");

function onLoginSubmit(event) {
    clock.classList.remove("hidden");
}

function painGreetings(username) {
    clock.classList.remove("hidden");
}

function getClock() {
    const date = new Date(); // 오늘의 date 가져오기
    // 숫자를 string으로 바꾸려면 String으로 감싸기 (대소문자 구분)
    // padStart(원하는 글자의 길이, 부족한 부분에 삽입할 문구)로 앞에 숫자를 채울 수 있음 (뒤에 넣고 싶으면 padEnd사용)
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`; // 변수를 string으로 변환해서 삽입
}

getClock(); // 브라우저가 로딩 되면 바로 시작할 수 있도록 함
setInterval(getClock, 1000); // 1초마다 함수 불러오기