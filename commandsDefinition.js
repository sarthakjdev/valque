module.exports = [
    {
        name: 'gsq',
        description: 'Initiate the queue process .',
    },
    {
        name: 'deletechannels',
        description: 'For cleaning the channels created under queuing system',
        type: 2,
        options: [

            {
                name: 'specific-channel',
                description: 'deletes only selected channel',
                type: 1,
                options: [
                    {
                        name: 'channelname',
                        description: 'for selecting that channel name to be deleted.',
                        type: 'CHANNEL',
                        required: true,
                    },
                ],
            },
            {
                name: 'all',
                description: 'deletes all channels created by this application',
                type: 1,
            },
        ],
    },
]
