import {addTodolistAC, todoListsReducer, TodoListDomainType} from "../todolist-reduser";
import tasksReducer, {TasksStateType} from "../Task/tasks-reduser";

test('ids should be equals', () => {
    // const startTasksState: TasksStateType = {};
    // const startTodolistsState: Array<TodoListDomainType> = [];
    //
    // const action = addTodolistAC("new todolist");
    //
    // const endTasksState = tasksReducer(startTasksState, action)
    // const endTodolistsState = todoListsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState);
    // const idFromTasks = keys[0];
    // const idFromTodolists = endTodolistsState[0].id;
    //
    // expect(idFromTasks).toBe(action.todolistId);
    // expect(idFromTodolists).toBe(action.todolistId);
});



