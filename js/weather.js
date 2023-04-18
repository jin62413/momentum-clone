const API_KEY = "447c4d81b91164c655abfbd1251faa89"

function onGeoOk(position) { // success 함수는 GeolocationPosition object 하나를 입력받음(유저의 위치), object를 position에 받아오기
    const lat = position.coords.latitude; // 위도 가져오기
    const lon = position.coords.longitude; // 경도 가져오기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url) // url을 열어볼 필요 없이 js가 url을 불러옴, 브라우저 검사-Network에서 확인 가능, promise타입의 함수
        .then(response => response.json()) // .then은 url에서 응답(Fulfiled)이 오면 함수가 시작되도록 함, json은 url이 가진 object
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name; // 도시 이름 가져와서 텍스트로 출력
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`; // 날씨/온도 가져와서 출력(첫번째 array의 main값)
        }); 
}

function onGeoError() { // 실패 시
    alert("Can't find you. No weather for you.")
}

// 브라우저에서 위치 좌표를 가져오는 함수, 위치 가져오는 걸 success했을 때와 error났을 때의 함수가 필요함
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);