const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'queue',
    exec: async (interaction) => {
        const startPlayingButton = new MessageButton().setCustomId('startPlaying').setLabel('Start Playing').setStyle('SUCCESS')
        const startPlayingRow = new MessageActionRow().addComponents(startPlayingButton)

        // Send Initial reply
        await interaction.reply({
            content: 'Kuchh bhi',
            components: [startPlayingRow],
        })

        const filterPlayingButton = (buttonInteraction) => buttonInteraction.customId === 'startPlaying'
        const playingCollector = interaction.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            filter: filterPlayingButton,
        })
        playingCollector.on('collect', async (playingButtonInteraction) => {
            if (interaction.client.queueManager.isQueued(playingButtonInteraction.user.id)) {
                await playingButtonInteraction.reply({ content: `You're already queued`, ephemeral: true })
            } else {
                const startQueue = new MessageButton().setCustomId('startQueue').setLabel('Start Queue').setStyle('SUCCESS')
                const row = new MessageActionRow().addComponents(startQueue)
                await playingButtonInteraction.reply({ content: 'start queue message', components: [row], ephemeral: true })
            }
        })

        const filterQueueButton = (buttonInteraction) => buttonInteraction.customId === 'startQueue'
        // Start main collector
        const startQueueButtonInteraction = interaction.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            filter: filterQueueButton,
        })
        startQueueButtonInteraction.on('collect', async (buttonInteraction) => {
            const startQueueDisabled = new MessageButton().setCustomId('startQueue').setLabel('Start Queue').setStyle('PRIMARY')
                .setDisabled(true)
            const rowDisabled = new MessageActionRow().addComponents(startQueueDisabled)
            await buttonInteraction.update({ components: [rowDisabled] })
            interaction.client.queueManager.addToQueue(buttonInteraction)
        })
    },
}
