import InterfaceComponent from './interface.vue';

export default {
    id: 'date-picker',
    name: 'Date Picker',
    description: 'Alternative Date Picker',
    icon: 'today',
    component: InterfaceComponent,
    types: ['dateTime', 'timestamp', 'date','time'],
    group: 'selection',
    options: ({ field }) => {
        const isTime = field.type === 'time'
        const label = isTime ? 'time' : 'date'

        const opts = [
            {
                field: 'min',
                name: `Min ${label} field name`,
                type: 'string',
                meta: {
                    width: 'half',
                },
            },
            {
                field: 'max',
                name: `Max ${label} field name`,
                type: 'string',
                meta: {
                    width: 'half',
                },
            }
        ];

        if (field.type !== 'date') {
            if (! isTime) {
                opts.push({
                    field: 'enableTime',
                    name: 'Enable Time',
                    type: 'boolean',
                    meta: {
                        width: 'full',
                        interface: 'boolean',
                        disabled: isTime
                    },
                    schema: {
                        default_value: isTime,
                    },
                })
            }

            opts.push(

                {
                    field: 'use24',
                    name: '$t:interfaces.datetime.use_24',
                    type: 'boolean',
                    meta: {
                        width: 'half',
                        interface: 'boolean',
                        hidden: true,
                        conditions: [
                            {
                                rule: {
                                    enableTime: {
                                        _eq: true
                                    }
                                },
                                hidden: false
                            }
                        ],
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
                        hidden: true,
                        conditions: [
                            {
                                rule: {
                                    enableTime: {
                                        _eq: true
                                    }
                                },
                                hidden: false
                            }
                        ],
                    },
                    schema: {
                        default_value: false,
                    },
                }
            );
        }

        return opts
    },
    recommendedDisplays: ['datetime'],
};