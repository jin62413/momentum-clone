// html 요소 갖고 오기
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

// 로그인 시 나타나야하는 요소
const hiddenClock = document.querySelector("h2#clock");
const hiddenTodoForm = document.querySelector("#todo-form");
const hiddenQuote = document.querySelector("#quote");
const hiddenWeather = document.querySelector("#weather");

// 자주쓰는 string을 헷갈리지 않도록 변수로 저장
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"

// 이름 입력 후 submit 눌렀을 떄
function onLoginSubmit(event) {
    event.preventDefault(); // 브라우저의 기본 동작(submit, 새로고침 등)을 막는 코드
    loginForm.classList.add(HIDDEN_CLASSNAME); // form 사라지게 하기
    const username = loginInput.value; // username에 사용자가 작성한 이름 저장
    localStorage.setItem(USERNAME_KEY, username); // localstorage에 이름 저장 (DB역할)
    greeting.innerText = `Hello ${username}`; // Heoll+이름 텍스트로 만들기
    greeting.classList.remove(HIDDEN_CLASSNAME); // 텍스트 보이게 하기

    hiddenClock.classList.remove(HIDDEN_CLASSNAME);
    hiddenTodoForm.classList.remove(HIDDEN_CLASSNAME);
    hiddenQuote.classList.remove(HIDDEN_CLASSNAME);
    hiddenWeather.classList.remove(HIDDEN_CLASSNAME);
}

// 로그인할 때 이름이 저장되어 있으면 실행되는 함수
function painGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);

    hiddenClock.classList.remove(HIDDEN_CLASSNAME);
    hiddenTodoForm.classList.remove(HIDDEN_CLASSNAME);
    hiddenQuote.classList.remove(HIDDEN_CLASSNAME);
    hiddenWeather.classList.remove(HIDDEN_CLASSNAME);
}

// localstorage에 있는 이름을 변수로 저장
const savedUsername = localStorage.getItem(USERNAME_KEY);

// 로그인 할 때 localstorage에 이름이 저장되어 있는지 판별
if(savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}
else {
    // show the greetings
    painGreetings(savedUsername);
}