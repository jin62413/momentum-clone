const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = []; // let으로 업데이트가 가능하게 설정(빈 array가 아닌 이전의 todo를 불러온 array로 시작할 수 있도록)

// 작성한 todo를 localstorage에 저장
function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // JSON.stringfy(js object나 array를 string으로 변환하는 기능)로 toDos객체를 string으로 바꿈
    // localstorage는 내용물만 string으로 변환 'a, b'
    // JSON.stringify는 리스트 째로 string 변환 '["a", "b"]'
}

function deleteToDo(event) {
    const li = event.target.parentElement; // 버튼을 클릭해서 이벤트가 발생했을 때, 해당 객체를 타겟한 후, 그것의 부모를 지정
    li.remove(); // 지정된 요소를 html에서 삭제, ui에선 삭제되지만 변수에는 여전히 접근 가능하기 때문에 아래의 코드를 수행할 수 있음
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    // li.id가 string, toDo.id는 number 타입이기 때문에 parseInt를 사용하여 숫자로 바꿔줌
    // toDos array의 object를 가져와 toDo(아무이름이나 상관없음)에 넣고 toDo의 id와 클릭된 li의 id가 같으면 제외하고 새로운 array 생성
    // funcion sexyFiler(toDo) { return todo.id !== li.id }와 같음(sexyFilter는 그냥 정한 이름)
    // fiter함수는 array에서 내가 없애고자 하는 요소를 제외하고 새로운 array를 만드는 함수, 항상 true를 리턴해야 함, false 값을 제외
    // 예를들어, funtion sexyFilter(tomato){ return tomato != 3 } 이렇게 함수를 지정하고
    // [1, 2, 3].filter(sexyFilter)를 하면
    // sexyFilter(1); sexyFilter(2); sexyFilter(3); 이렇게 array의 각각 object마다 실행해서 true, false를 판단하고
    // [1, 2]가 새로 생성
    saveTodos(); // 새로운 array를 생성했기 때문에 다시 localstorage에 저장
}

// 이 함수에서의 newTodo는 newTodoObj의 object를 가진 인수, 이 함수에서만 유효한 인수(다른 newTodo랑 헷갈리지 않기)
function paintToDo(newTodo) { 
    const li = document.createElement("li"); // html에 li 생성
    li.id = newTodo.id // html에서 li의 id(newTodoObj에서 가져온) 생성(document내의 요소는 string으로 선언됨)
    const span = document.createElement("span"); // html에 span 생성
    span.innerText = newTodo.text; // span에 newTodo(input된 todo의 텍스트)를 텍스트로 출력
    const button = document.createElement("button");
    // button.innerText = "❌"; // 버튼에 이모지 출력
    button.setAttribute("class", "fas fa-times"); // 버튼에 font awesome 아이콘 출력
    button.addEventListener("click", deleteToDo); // 버튼 클릭 시 해당 리스트 삭제
    li.appendChild(span); // span을 li의 자식으로 지정
    li.appendChild(button); // 버튼을 li의 자식으로 지정
    toDoList.appendChild(li); // 리스트를 toDoList의 자식으로 지정

    span.addEventListener('click', (e)=> {
        span.style.textDecoration = span.style.textDecoration === 'line-through' ? '': 'line-through';
        // if 조건문의 축약, textDecoration이 line-through면 삭제 아니면 삽입
    })
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value; // input된 todo를 newTodo에 저장
    toDoInput.value = ""; // 엔터를 누르면 text상자가 비워짐
    const newTodoObj = { // todo의 각 항목에 랜덤한 id 부여
        text: newTodo, // 사용자가 작성한 텍스트
        id: Date.now(), // 밀리초(1000분의 1초)를 주는 함수
    };
    if (toDos.length < 10) { // toDos배열의 길이가 10개보다 적으면
        toDos.push(newTodoObj); // 오브젝트(텍스트와 id)를 toDos array로 보내기
        paintToDo(newTodoObj); // todo리스트 생성
    }
    else {
        return alert("오늘 할 일은 충분할 것 같아요!"); // toDos배열의 길이가 10개보다 많으면 알림 출력
    }
    saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); // 저장된 todo를 가지고 오기

// localstorage가 비어있지 않다면
if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    // 앞에서 JSON.stringify로 변환한 string을 JSON.parse를 사용해 리스트를 다시 객체로 변환
    toDos = parsedToDos;
    // 객체를 toDos에 넣어서 array 생성(새로고침 했을 때 전에 작성한 todo는 사라지고 새로운 todo만 남는 것을 방지하기 위해)
    parsedToDos.forEach(paintToDo); // 배열을 통째로 사용하는게 아니라 각각 하나씩 사용할 수 있도록 함, 각각의 item이 object가 됨
    // parsedToDos.forEach(sayHello()); 
    // function sayHello(item) {
    //    console.log("this is", item);
    // }
    // parsedToDos.forEach((item) => consloe.log("this is", item)); 화살표 함수로 function을 짧게 쓰는 방법(위 4개의 주석이랑 똑같음)
}

const finish = document.querySelectorAll("#todo-list li");
finish.forEach((li) => { // querySelectorAll은 배열로 받아와서 forEach를 사용해야 함
    li.addEventListener('click', (e)=> {
        li.style.textDecoration = li.style.textDecoration === 'line-through' ? '': 'line-through';
        // if 조건문의 축약, textDecoration이 line-through면 삭제 아니면 삽입
    })
})