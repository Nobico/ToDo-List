const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const done = document.getElementById('completed');

(function(){
    
    for(var key in localStorage){
        var html = localStorage.getItem(key);

        if (html) {
            list.innerHTML += localStorage.getItem(key);

        }else{
            list.innerHTML = localStorage.getItem('edit');
        }
    }

    done.innerHTML = localStorage.getItem('done');

})();

function saveEdits() { 

    var editElems = list.innerHTML;

    localStorage.setItem('edit',editElems);

    var doneElems = done.innerHTML;

    localStorage.setItem('done',doneElems);

    document.getElementById("update").innerHTML="Tasks saved!";

}

const saveTaskToLocalStorage = (task, html) => {

    if(html){

        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

const createTodoList = task => {
    var min = 1 ;
    var max = 1000 ;
    var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    var b = Math.floor( Math.random() * (max + 1 - min) ) + min ;

    const html = `
    <li class="todo-list">
        <div class="todo-text" contenteditable="true"><input class="checkbox-input cb" id="cb-${a}-${b}" type="checkbox" name="check" onclick="foo(this)" value="${task}">${task}</div>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;

    saveTaskToLocalStorage(task, html);

}

addTask.addEventListener('submit', e => {

    e.preventDefault();

    const task = addTask.add.value.trim();
    if(task.length) {

        createTodoList(task);
     
        addTask.reset();
    }
});

function foo(t) {
    var m = t.id;
    if (document.getElementById(m).checked) {       
        
        var n = document.getElementById(m).parentNode.textContent;
        var min1 = 1 ;
        var max1 = 1000 ;
        var a1 = Math.floor( Math.random() * (max1 + 1 - min1) ) + min1 ;
        var b1 = Math.floor( Math.random() * (max1 + 1 - min1) ) + min1 ;
        const doneList = `
        <li class="todo-list">
            <div class="todo-text"><input class="checkbox-input cb2" id="cb-${a1}-${b1}" type="checkbox" name="check" onclick="foo2(this)" value="${n}"><i class="fas fa-check check-icon"></i>${n}</div>
            <i class="far fa-trash-alt delete"></i>
        </li>
        `;

        done.innerHTML += doneList;
        document.getElementById(m).parentNode.parentNode.remove();
    }

}

function foo2(tt) {
    var mm = tt.id;
    if (document.getElementById(mm).checked) {
        
        var nn = document.getElementById(mm).parentNode.textContent;
        var min2 = 1 ;
        var max2 = 1000 ;
        var a2 = Math.floor( Math.random() * (max2 + 1 - min2) ) + min2 ;
        var b2 = Math.floor( Math.random() * (max2 + 1 - min2) ) + min2 ;
        const doneListReturn = `
        <li class="todo-list">
            <div class="todo-text" contenteditable="true"><input class="checkbox-input cb" id="cb-${a2}-${b2}" type="checkbox" name="check" onclick="foo(this)" value="${nn}">${nn}</div>
            <i class="far fa-trash-alt delete"></i>
        </li>
        `;

        list.innerHTML += doneListReturn;
        document.getElementById(mm).parentNode.parentNode.remove();
    }

}

done.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        
        const task2 = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task2);

    }
    
});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();

        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

const filterTasks = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {

    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});
