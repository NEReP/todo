let todoInput = document.querySelector(".toDo__input"),
 addBtn = document.querySelector(".add"),
 todo = document.querySelector(".toDo__list"),
 todoCompleted = document.querySelector(".toDo__list-completed"),
 resetBtn = document.querySelector('.reset')

let todoList=[];
let completed=[];


function createNewTodo() {
   if (todoInput.value) {
      let newTodo = {
         value:todoInput.value,
         checked:false,
      };
      todoList.push(newTodo);
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
      todoInput.value='';  
   }
   else {
      return
   }
}

function displayMessages() {
   let displayMessage = "";
      todoList.forEach((item,i )=>{
         displayMessage += `
         <li class="toDo__item">
            <input type="checkbox" id="item_${i}" class="close" ${item.checked ? "checked":""}>
            ${item.value}
            <label for="item_${i}"></label>
         </li>`;
         todo.innerHTML = displayMessage;
        
      })
   if(localStorage.getItem("todo")){
      

     
   }
}
function dispayCompletedMesseages() {
      if(localStorage.getItem("completedTodo")){
         let displayMessage = "";

         completed.forEach((item,i )=>{
            displayMessage += `
            <li class="toDo__item completed">
               <input type="checkbox" id="item_${i}-completed" class="close" ${item.checked ? "checked":""}>
               <label for="item_${i}-completed"></label>
               ${item.value}
            </li>`;
            todoCompleted.innerHTML = displayMessage;
         })
   }
   
}

addBtn.addEventListener("click",()=>{
      createNewTodo()
})

document.addEventListener('keydown', function(event) {
   if (event.code == 'Enter') {
      createNewTodo()
   }
   else{
      return ;
   }
});



if (localStorage.getItem("todo")){
   todoList = JSON.parse(localStorage.getItem("todo"))
   displayMessages();

}

if(localStorage.getItem("completedTodo")){
   completed = JSON.parse(localStorage.getItem("completedTodo"))
   dispayCompletedMesseages();
}




todo.addEventListener("change",(e)=>{
   let idInput = e.target.getAttribute("id");
 

   todoList.forEach((item, i)=>{
  
      item.id =`item_${i}`;

      if(item.id === idInput){
         item.checked = !item.checked;
         localStorage.setItem("todo", JSON.stringify(todoList));

         if(item.checked){
            todoList.splice(i,1)
            setTimeout(displayMessages, 200)
            completed.push(item);
            item.id =`item_${completed.indexOf(item)}`;

            localStorage.setItem("todo", JSON.stringify(todoList));
            localStorage.setItem("completedTodo",JSON.stringify(completed));

            setTimeout(dispayCompletedMesseages, 500);

            if(!todoList.length){ //Удаление последнего элемента в todo
               displayMessage = "";
               todo.innerHTML = displayMessage;      
            }  
         }
      }
   })
})

resetBtn.addEventListener("click", ()=>{
   completed.length = 0;
   localStorage.setItem("completedTodo",JSON.stringify(completed));
   displayMessage = "";
   todoCompleted.innerHTML = displayMessage; 
})

todoCompleted.addEventListener("change",(e)=>{
   let idInput = e.target.getAttribute("id");
   completed.forEach((item, i)=>{
      item.id =`item_${i}-completed`;
      if(item.id === idInput){
         item.checked = !item.checked;
         localStorage.setItem("completedTodo",JSON.stringify(completed));

         if(!item.checked){
            completed.splice(i,1);
            todoList.push(item);
            item.id = `item_${todoList.indexOf(item)}`
            localStorage.setItem("todo", JSON.stringify(todoList));
            localStorage.setItem("completedTodo",JSON.stringify(completed));
            
            dispayCompletedMesseages();
            displayMessages();
            
            if(!completed.length){ //Удаление последнего элемента в todo
               displayMessage = "";
               todoCompleted.innerHTML = displayMessage;
               console.log("12");
      
            }  
         }
      } 
   })
})

