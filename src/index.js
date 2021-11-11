import InterfaceComponent from './interface.vue';

export default {
    id: 'date-picker',
    name: 'Date Picker',
    description: 'Alternative Date Picker',
    icon: 'today',
    component: InterfaceComponent,
    types: ['datetime', 'timestamp', 'date'],
    group: 'selection',
    options: [
        {
            field: 'enableTime',
            name: 'Enable Time',
            type: 'boolean',
            meta: {
                width: 'full',
                interface: 'boolean',
            },
            schema: {
                default_value: true,
            },
        },
        {
            field: 'use24',
            name: '$t:interfaces.datetime.use_24',
            type: 'boolean',
            meta: {
                width: 'half',
                interface: 'boolean',
            },
            schema: {
                default_value: true,
            },
        },
        {
            field: 'enableSeconds',
            name: '$t:interfaces.datetime.include_seconds',
            type: 'boolean',
            meta: {
                width: 'half',
                interface: 'boolean',
            },
            schema: {
                default_value: false,
            },
        },
    ],
    recommendedDisplays: ['datetime'],
};