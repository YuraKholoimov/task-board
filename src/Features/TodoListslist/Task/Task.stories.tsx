import React from "react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskPriorities, TaskStatus} from "../../../API/todolists-api";
import {todoListID1} from "../todolist-reduser";

export default {
    title: "Task component",
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args: TaskPropsType) => {
    return <>
        <Task {...args}/>
    </>
}

export const TaskBaseExample = Template.bind({});

TaskBaseExample.args = {
    task: {
        id: '1',
        status: TaskStatus.Completed,
        title: 'JS',
        description: '',
        priority: TaskPriorities.low,
        startDate: '',
        deadline: '',
        todoListId: todoListID1,
        order: 0,
        addedDate: '',
        entityStatus: "idle"
    },
    todoListId: 'todoList_1',
    removeTask: action("remove"),
    onChangeTaskStatus: action('chane task Status'),
    changeTaskTitle: action('chane task Status')
    }

export const TaskBaseExample_2 = Template.bind({});

TaskBaseExample_2.args = {
    task: {
        id: '1',
        status: TaskStatus.Completed,
        title: 'JS',
        description: '',
        priority: TaskPriorities.low,
        startDate: '',
        deadline: '',
        todoListId: todoListID1,
        order: 0,
        addedDate: '',
        entityStatus: "idle"
    },
    todoListId: 'todoList_1',
    removeTask: action("remove"),
    onChangeTaskStatus: action('chane task Status'),
    changeTaskTitle: action('chane task Status')
}