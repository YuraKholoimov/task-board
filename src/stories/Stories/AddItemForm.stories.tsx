import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "../../Components/AddItemForm";
import {action} from '@storybook/addon-actions';
import {Meta, Story} from "@storybook/react/types-6-0";


export default {
    title: 'AddItemFormForExample',
    component: AddItemForm,
    argTypes: {
        callback: { description: 'Button inside form clicked' },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType ) => <AddItemForm {...args}/>;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    callback: action('Button inside form clicked')
}
