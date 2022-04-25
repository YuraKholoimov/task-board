import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../tasks-reduser";
import {addTodolistAC, removeTodolistAC} from "../todolist-reduser";
import {TaskPriorities, TaskStatus, TaskType} from "../../API/todolists-api";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;

let startState: StateTaskType

type StateTaskType = {
    [key: string]: Array<TaskType>
}

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {
                description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: todolistId1,
                order: 0,
                addedDate: "",
            },
            {
                description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: todolistId1,
                order: 0,
                addedDate: "",
            }
        ],
        [todolistId2]: [
            {
                description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: todolistId2,
                order: 0,
                addedDate: "",
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("1", todolistId1);
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            {
                description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: todolistId1,
                order: 0,
                addedDate: "",
            }
        ],
        [todolistId2]: [
            {
                description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: todolistId2,
                order: 0,
                addedDate: "",
            }
        ]
    })
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", todolistId2);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe("juce");
    expect(endState[todolistId2][0].status).toBe(TaskStatus.Completed);
})

test("status of specified task should be changed", () => {

    const action = changeTaskStatusAC(
        "2", TaskStatus.New, todolistId1
    );

    const endState = tasksReducer(startState, action)

    expect(endState[action.todolistId][1].id).toBe('2');

})

test("title of specified task should be changed", () => {

    const action = changeTaskTitleAC(
        "New", "1", todolistId2
    );

    const endState = tasksReducer(startState, action)

    expect(endState[action.todolistId][0].title).toBe('New');

});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistId2);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});

