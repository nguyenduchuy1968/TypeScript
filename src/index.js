var NoteBook = /** @class */ (function () {
    function NoteBook(name) {
        this.name = name;
        this._initMain();
    }
    NoteBook.prototype._getTodosFromLS = function () {
        // @ts-ignore
        this._todos = JSON.parse(localStorage.getItem(this.name)) || [];
    };
    NoteBook.prototype._setTodosToLS = function () {
        localStorage.setItem(this.name, JSON.stringify(this._todos));
        this._initTodos();
    };
    NoteBook.prototype._initMain = function () {
        this._initForm();
        this._initTodos();
        this._deleteTodo();
    };
    NoteBook.prototype._initTodos = function () {
        this._getTodosFromLS();
        // console.log('!!!!', this._todos);
        var todosDiv = document.querySelector('#todos');
        todosDiv.innerHTML = '';
        this._todos.forEach(function (todo) {
            // Creating div which wraps 2 other divs (todoDiv and deleteBtn) inside
            var wrapperDiv = document.createElement('div');
            var todoDiv = document.createElement('div');
            var deleteBtn = document.createElement('button');
            //add to the deleteBtn button id = 'todo.id'
            deleteBtn.style.marginLeft = '10px';
            // @ts-ignore
            deleteBtn.id = todo.id.toString();
            deleteBtn.innerText = 'Delete';
            //todoDiv button
            todoDiv.style.display = 'inline-block';
            todoDiv.innerText = "".concat(todo.id, ") ").concat(todo.title);
            ////add to the wrapperDiv id = 'w${todo.id.toString()}'
            wrapperDiv.style.paddingBottom = '10px';
            wrapperDiv.append(todoDiv, deleteBtn);
            wrapperDiv.id = "w".concat(todo.id.toString());
            todosDiv.appendChild(wrapperDiv);
        });
    };
    NoteBook.prototype._initForm = function () {
        var _this = this;
        // @ts-ignore
        var form = document.forms['form'];
        this._getTodosFromLS();
        form.onsubmit = function (e) {
            var _a;
            // @ts-ignore
            var input = e.target['title'];
            var id = ((_a = _this._todos.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id) + 1 || 1;
            _this._todos.push({ id: id, title: input.value });
            _this._setTodosToLS();
            form.reset();
        };
    };
    // creating method for deleting element "todo" and add it to _initMain()
    // set new arr tempArr = this._todos for using (for deleting element) inside foreach
    // set new avaliable keyName = this.name for saving newchange into  localStorage
    NoteBook.prototype._deleteTodo = function () {
        this._getTodosFromLS();
        var tempArr = this._todos;
        var keyName = this.name;
        this._todos.forEach(function (todo) {
            var delBtn = document.getElementById("".concat(todo.id));
            delBtn.onclick = function () {
                // deleting element of tempArr (object) with index = indexOf(todo)
                tempArr.splice(tempArr.indexOf(todo), 1);
                // set new change to localStorage
                localStorage.setItem(keyName, JSON.stringify(tempArr));
                // findout wrapperDiv with id = 'w${todo.id.toString()}'
                var wrap = document.getElementById("w".concat(todo.id.toString()));
                //remove wrapperDiv
                wrap.remove();
            };
        });
    };
    return NoteBook;
}());
new NoteBook('notebook3');
