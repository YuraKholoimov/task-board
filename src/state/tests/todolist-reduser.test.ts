import {v1} from 'uuid';
import {
    addTodolistAC, removeTodolistAC,
    TodoListsActionTypes,
    todoListsReducer,
    TodoListType
} from "../todolist-reduser";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListType>;

beforeEach(() => {
    todolistId1  = v1();
    todolistId2  = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle: string = "New Todolist";

    const endState = todoListsReducer(startState, addTodolistAC("New Todolist"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("Change todolist title", () => {

    const newTitle = "NewTitle"

    const action: TodoListsActionTypes = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId1,
        title: newTitle
    }
    let changedState = todoListsReducer(startState, action)

    expect(changedState[0].title).toBe("NewTitle")
})