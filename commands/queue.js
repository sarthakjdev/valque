const { MessageActionRow, MessageButton, GuildChannelManager, Collection } = require('discord.js')
const startMsgComponents = require('../embeds&buttons/start')
const queueMsgComponents = require('../embeds&buttons/queueEmbed')



module.exports = {
    name: 'queue',
    exec: async (interaction) => {
        // Send Initial reply
        await interaction.reply({
            embeds: [startMsgComponents.startPlayingembed],
            components: [startMsgComponents.startPlayingRow],
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
                await playingButtonInteraction.reply({ components: [queueMsgComponents.queuePlayingRow], embeds: [queueMsgComponents.queuePlayingembed], ephemeral: true })
                
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
