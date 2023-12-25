interface ITodo {
    id: number;
    title: string
}

class NoteBook {
    private _todos!: ITodo[];

    constructor(private name: string) {
        this._initMain()
    }

    private _getTodosFromLS(): void {
        // @ts-ignore
        this._todos = JSON.parse(localStorage.getItem(this.name)) || []
    }

    private _setTodosToLS(): void {
        localStorage.setItem(this.name, JSON.stringify(this._todos))
        this._initTodos()
    }

    private _initMain(): void {
        this._initForm();
        this._initTodos();
        this._deleteTodo();
    }

    private _initTodos(): void {
        this._getTodosFromLS();
        // console.log('!!!!', this._todos);
        const todosDiv = document.querySelector('#todos') as HTMLDivElement;

        todosDiv.innerHTML = '';

        this._todos.forEach(todo => {
            // Creating div which wraps 2 other divs (todoDiv and deleteBtn) inside
            const wrapperDiv = document.createElement('div') as HTMLDivElement;
            const todoDiv = document.createElement('div');
            const deleteBtn = document.createElement('button') as HTMLButtonElement;

            //add to the deleteBtn button id = 'todo.id'
            deleteBtn.style.marginLeft = '10px';
            // @ts-ignore
            deleteBtn.id = todo.id.toString();
            deleteBtn.innerText = 'Delete';

            //todoDiv button
            todoDiv.style.display = 'inline-block';
            todoDiv.innerText = `${todo.id}) ${todo.title}`;

            ////add to the wrapperDiv id = 'w${todo.id.toString()}'
            wrapperDiv.style.paddingBottom = '10px';
            wrapperDiv.append(todoDiv, deleteBtn);
            wrapperDiv.id = `w${todo.id.toString()}`;
            todosDiv.appendChild(wrapperDiv);
        })
    }

    private _initForm(): void {
        // @ts-ignore
        const form = document.forms['form'] as HTMLFormElement;
        this._getTodosFromLS();
        form.onsubmit = (e) => {
            // @ts-ignore
            const input = e.target['title'] as HTMLInputElement;
            const id = this._todos.slice(-1)[0]?.id + 1 || 1;
            this._todos.push({id, title: input.value})
            this._setTodosToLS()
            form.reset();
        }
    }

    // creating method for deleting element "todo" and add it to _initMain()
    // set new arr tempArr = this._todos for using (for deleting element) inside foreach
    // set new avaliable keyName = this.name for saving newchange into  localStorage
    private _deleteTodo(): void {
        this._getTodosFromLS();
        let tempArr = this._todos;
        const keyName = this.name;
        this._todos.forEach(todo => {
            const delBtn = document.getElementById(`${todo.id}`) as HTMLButtonElement;
            delBtn.onclick = function () {
                // deleting element of tempArr (o)bject) with index = indexOf(todo)
                tempArr.splice(tempArr.indexOf(todo), 1);
                // findout wrapperDiv with id = 'w${todo.id.toString()}'
                const wrap = document.getElementById(`w${todo.id.toString()}`) as HTMLDivElement;
                //remove wrapperDiv
                wrap.remove();
                // set new change to localStorage
                localStorage.setItem(keyName, JSON.stringify(tempArr));
            }
        });
    }
}

new NoteBook('notebook3');
