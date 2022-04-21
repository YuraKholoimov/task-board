import React from "react";
import {action} from "@storybook/addon-actions";
import {EditSpan, EditSpanPropsType} from "../../Components/EditSpan";
import {Meta, Story} from "@storybook/react/types-6-0";

export default {
    title: "EditSpan component",
    component: EditSpan,
    argType: {
        onChange: {
            description: 'Value EditaSpan changed'
        },
        value: {
            defaultValue: 'Html',
            description: 'Start value EditSpan'
        }
    }
} as Meta;

const Template: Story<EditSpanPropsType> = (args: EditSpanPropsType) => <EditSpan {...args}/>

export const EditSpanExample = Template.bind({})

EditSpanExample.args = {
    title: 'Start value',
    callback: action('Change')

}