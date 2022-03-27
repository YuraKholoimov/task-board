import {v1} from 'uuid';
import {
    addTodolistAC, removeTodolistAC,
    TodoListsActionTypes,
    todoListsReducer,
    TodoListType
} from "../todolist-reduser";

test('correct todolist should be removed', () => {
    let todolistId1: string = v1();
    let todolistId2: string = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle: string = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodolistAC("New Todolist"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("Change todolist title", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const newTitle = "NewTitle"

    const action: TodoListsActionTypes = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId1,
        title: newTitle
    }
    let changedState = todoListsReducer(startState, action)

    expect(changedState[0].title).toBe("NewTitle")
})