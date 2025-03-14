
let draggedCard=null;  // for dragging card
let rightClickedCard=null;  // for context menu card



function createTaskElement(text,taskdate){
    const taskElement=document.createElement("div");

    taskElement.innerHTML = `<span>${text}</span><br><small class="time">${taskdate}</small>`;

    taskElement.setAttribute("draggable",true);
    taskElement.addEventListener("dragstart",dragstart);
    taskElement.addEventListener("dragend",dragend);

    taskElement.addEventListener("contextmenu",function(event){
        event.preventDefault();
        rightClickedCard=this;
        showContextMenu(event.pageX,event.pageY);
        
    });
    return taskElement;
}

const contextmenu=document.querySelector(".context-menu");
function showContextMenu(x,y){
     contextmenu.style.left=`${x}px`;
     contextmenu.style.top=`${y}px`;
     contextmenu.style.display="block";

}
// to remove conteext menu
document.addEventListener("click",()=>{
    contextmenu.style.display="none";
});

function dragstart(event){
    this.classList.add("dragging");
    draggedCard=this;
}

function dragend(event){
    this.classList.remove("dragging");
    ["todo","doing","done"].forEach((columnId)=>{
        updateTasksCount(columnId);
    })
    // 
    updateLocalStorage();
}

// start from here to debug
function addTask(columnId){

    const input=document.getElementById(`${columnId}-input`);
    const tasktext=input.value.trim();
    if(tasktext===""){
        alert("enter something in task");
        return;
    } 
    const taskdate=new Date().toLocaleString();
    const taskElement=createTaskElement(tasktext,taskdate);
    document.getElementById(`${columnId}-task`).appendChild(taskElement);
    taskElement.classList.add("card");  // adding css to it class name card
    input.value="";
    updateTasksCount(columnId);

    saveTasktoLocalStorage(columnId,tasktext,taskdate);

}
//   checking in all coumns
const columns=document.querySelectorAll(".column .task");

columns.forEach((column)=>{
    column.addEventListener("dragover",dragover);

});
// Event Listeners Automatically Pass the Event Object 
// When you attach an event listener like this:
function dragover(event){
    event.preventDefault();  // for some reason on deploying it wont workd as html bydeafult nature dondo drag and drop so remove it
    // this.appendChild(draggedCard);
    const afterElement=getDragAfterElement(this,event.pageY);
    if(afterElement==null){
        this.appendChild(draggedCard);
    }
    else {
        this.insertBefore(draggedCard,afterElement);

    }
    updateLocalStorage();
}

function editTask(){
   
    if(rightClickedCard){
       
        const newtasktext=prompt("Edit task-",rightClickedCard.textContent);
        if(newtasktext!=="") rightClickedCard.textContent=newtasktext; 
    }
    updateLocalStorage();
}

function deleteTask(){
    
    const columnId=rightClickedCard.parentElement.id.replace("-task","");
    if(rightClickedCard){
        rightClickedCard.remove();
        rightClickedCard=null;
    }
    updateTasksCount(columnId);

    // check kr lo local storage se deldte hua hai ya nhi
    updateLocalStorage();
    
}

function updateTasksCount(columnID){
  const count=document.querySelectorAll(`#${columnID}-task .card`).length;  // .card is used for styling
  document.getElementById(`${columnID}-count`).textContent=count;
}

// LOCAL STORAGE PART ??

function  saveTasktoLocalStorage(columnId,tasktext,taskdate){
   const task=JSON.parse(localStorage.getItem(columnId))|| [];
   // as it is stroed in form of string so we hve to parse it 
   task.push({text:tasktext,date:taskdate});
   localStorage.setItem(columnId,JSON.stringify(task));  // as in local so=torage it should be stored in string
};

document.addEventListener("DOMContentLoaded",loadTaskfromLocalStorage);
function loadTaskfromLocalStorage(){
    ["todo","doing","done"].forEach((columnId)=>{
          // in local stoge it is in string form
          const task=JSON.parse(localStorage.getItem(columnId))|| [];
          task.forEach(({text,date})=>{

              const taskElement=createTaskElement(text,date);
              taskElement.classList.add("card");
              document.getElementById(`${columnId}-task`).appendChild(taskElement);
          });
          updateTasksCount(columnId);
    });

};

function updateLocalStorage(){
   ["todo","doing","done"].forEach((columnId)=>{
        const task=[];
        document.querySelectorAll(`#${columnId}-task .card`).forEach((card)=>{
            const tasktext=card.querySelector("span").textContent;
            const taskdate=card.querySelector("small").textContent;
            task.push({text:tasktext,date:taskdate});
        });
        localStorage.setItem(columnId,JSON.stringify(task));
        updateTasksCount(columnId);
   });
};


function reset(){
   
    localStorage.clear();  // Clears local storage
    document.querySelectorAll(".task").forEach(taskColumn => {
        taskColumn.innerHTML = "";
    });
    ["todo", "doing", "done"].forEach(columnId => {
        updateTasksCount(columnId);
    });
    alert("Reset Scuessfully");

}

// drag sorting logic


f
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".card:not(.dragging)")];
    const result = draggableElements.reduce((closestElement, currentElement) => {
        const box = currentElement.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closestElement.offset) {
            return { offset: offset, element: currentElement };
        } else {
            return closestElement;
        }
    }, { offset: Number.NEGATIVE_INFINITY });
    return result.element;
}
















