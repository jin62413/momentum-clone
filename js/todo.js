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
    li.remove(); // 지정된 요소를 삭제
}

function paintToDo(newTodo) {
    const li = document.createElement("li"); // html에 li 생성
    const span = document.createElement("span"); // html에 span 생성
    span.innerText = newTodo; // span에 newTodo(input된 todo)를 텍스트로 출력
    const button = document.createElement("button");
    button.innerText = "❌"; // 버튼에 이모지 출력
    button.addEventListener("click", deleteToDo); // 버튼 클릭 시 해당 리스트 삭제
    li.appendChild(span); // span을 li의 자식으로 지정
    li.appendChild(button); // 버튼을 li의 자식으로 지정
    toDoList.appendChild(li); // 리스트를 toDoList의 자식으로 지정
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value; // input된 todo를 newTodo에 저장
    toDoInput.value = ""; // 엔터를 누르면 text상자가 비워짐
    toDos.push(newTodo); // toDos로 보내기
    paintToDo(newTodo); // todo리스트를 만들기
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
    parsedToDos.forEach(paintToDo); // 배열을 통째로 사용하는게 아니라 각각 하나씩 사용할 수 있도록 함
    // parsedToDos.forEach(sayHello()); 
    // function sayHello(item) {
    //    console.log("this is", item);
    // }
    // parsedToDos.forEach((item) => consloe.log("this is", item)); 화살표 함수로 function을 짧게 쓰는 방법(위 4개의 주석이랑 똑같음)
}