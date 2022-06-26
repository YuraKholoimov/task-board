import {v1} from 'uuid';
import {
    addTodolistAC, removeTodolistAC, setTodolistsAC,
    TodoListDomainType, todoListID1,
    TodoListsActionTypes,
    todoListsReducer,
} from "../todolist-reduser";
import {actions} from "@storybook/addon-actions";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>;

beforeEach(() => {
    todolistId1  = v1();
    todolistId2  = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "ALL", addedDate: "",order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "ALL", addedDate: "",order: 0, entityStatus: "idle"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// test('correct todolist should be added', () => {
//
//     let newTodolistTitle: string = "New Todolist";
//
//     const endState = todoListsReducer(startState, addTodolistAC("New Todolist"))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });

test("Change todolist title", () => {

    // const newTitle = "NewTitle"
    //
    // const action: TodoListsActionTypes = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistId1,
    //     title: newTitle,
    //
    // }
    // let changedState = todoListsReducer(startState, action)
    //
    // expect(changedState[0].title).toBe("NewTitle")
})

test("Set todolist to state", () => {

    let action = setTodolistsAC({todoLists: startState})
let endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2)
})