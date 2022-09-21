import tasksReducer, {
    addTaskAC, removeTaskTC,
    setTasks,
    updateTaskAC
} from "../Task/tasks-reduser";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todoListID1} from "../todolist-reduser";
import {TaskPriorities, TaskStatus, TaskType} from "../../../API/todolists-api";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;

let startState: StateTaskType;

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
                entityStatus: "idle"
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
                entityStatus: "idle"
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
                entityStatus: "idle"
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskTC.fulfilled({idTask: "1", todolistId: todolistId1},'', {taskId: "1", todoListId: todolistId1});
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

    const action = addTaskAC({
        task: {
            title: "New",
            status: TaskStatus.New,
            addedDate: '',
            deadline: '',
            description: '',
            entityStatus: "idle",
            order: 0,
            id: 'id exist',
            priority: TaskPriorities.Later,
            startDate: '',
            todoListId: todolistId2,
        },
        todolistId: todolistId2
    });

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe("juce");
    expect(endState[todolistId2][0].status).toBe(TaskStatus.Completed);
})

test("status of specified task should be changed", () => {

    const action = updateTaskAC({id: "2", model: {status: TaskStatus.New}, todolistId: todolistId1});

    const endState = tasksReducer(startState, action)

    expect(endState[action.payload.todolistId][1].id).toBe('2');
})

test("title of specified task should be changed", () => {

    const action = updateTaskAC({id: "1", model: {title: "New"}, todolistId: todolistId2});

    const endState = tasksReducer(startState, action)

    expect(endState[action.payload.todolistId][0].title).toBe('New');
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        todoList: {
            id: todoListID1,
            title: "New",
            addedDate: "",
            order: 0
        }
    });

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todo-listId should be deleted', () => {

    const action = removeTodolistAC({todolistId: todolistId2});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});

test("Add empty array when todo-lists set to state", () => {

    let action = setTodolistsAC({
        todoLists: [
            {id: todolistId1, order: 0, addedDate: "", title: "title1"},
            {id: todolistId2, order: 0, addedDate: "", title: "title2"},
        ]
    })
    let endState = tasksReducer({}, action)

    let key = Object.keys(endState)
    expect(key.length).toBe(2)
    expect(endState[todolistId1]).toStrictEqual([])
})

test("Task should be added for todolist", () => {

    let action = setTasks.fulfilled({tasks: startState[todolistId1], todolistId: todolistId1}, '', todolistId1)
    let endState = tasksReducer({
        todolistId1: [],
        todolistId2: []
    }, action)


    expect(endState[todolistId1].length).toBe(2)
})