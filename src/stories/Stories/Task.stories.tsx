import React from "react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../../Components/Task";
import { ComponentMeta, ComponentStory } from "@storybook/react";

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
    task: {id: '1', isDone: true, title: 'JS'},
    todoListId: 'todoList_1',
    removeTask: action("remove"),
    onChangeTaskStatus: action('chane task Status'),
    changeTaskTitle: action('chane task Status')
    }

export const TaskBaseExample_2 = Template.bind({});

TaskBaseExample_2.args = {
    task: {id: '2', isDone: true, title: 'HTML'},
    todoListId: 'todoList_1',
    removeTask: action("remove"),
    onChangeTaskStatus: action('chane task Status'),
    changeTaskTitle: action('chane task Status')
}


// export const TaskBaseExample = () => {
//     return <>
//         <Task removeTask={action("remove")} onChangeTaskStatus={action('chane task Status')}
//               changeTaskTitle={action('change task title')}
//               task={{id: '1', isDone: true, title: 'CSS'}} todoListId={'tofoList_1'}/>
//         <Task removeTask={action("remove")} onChangeTaskStatus={action('chane task Status')}
//               changeTaskTitle={action('change task title')}
//               task={{id: '2', isDone: true, title: 'HTML'}} todoListId={'tofoList_2'}/>
//     </>
// }