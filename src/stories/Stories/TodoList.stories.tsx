import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TodoList, TodoListComponentType} from "../../Features/TodoListslist/TodoList";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";
import {state, store} from "../../App/store";
import { action } from "@storybook/addon-actions";
import {todoListID1} from "../../Features/TodoListslist/todolist-reduser";

export default {
    title: "TodoListslist component",
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args: TodoListComponentType) => {
    return <>
        <TodoList {...args}/>
    </>
}

const tasks = store.getState().tasks[todoListID1]

export const TodoListBaseExample = Template.bind({});
TodoListBaseExample.args = {
    title: 'todolist',
    id: "1",
    changeTaskTitle: action("change"),
    tasks: tasks,
    addTask: action('add tack'),
    onChangeTaskStatus: action('change'),
    filter: "filter",
    removeTask: action('remove'),
    changeFilterTodoList: action('change'),
    changeTodoListTitle: action('change'),
    removeTodolist: action('remove to do list')
}
