import {v1} from 'uuid';
import {TodoListType} from '../../App';
import {addTodolistACType, changeTodolistTitleACType, todolistReducer} from "../todolist-reduser";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle: string = "New Todolist";

    const action: addTodolistACType = {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    }

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, action)

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

    const action: changeTodolistTitleACType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId1,
        title: newTitle
    }
    let changedState = todolistReducer(startState, action)

    expect(changedState[0].title).toBe("NewTitle")
})