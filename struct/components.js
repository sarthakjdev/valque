const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const _ = require('lodash')

const { THUMBNAIL } = process.env

class Components {
    static getJoinGame(url) {
        const joinGameButton = new MessageButton().setLabel('Join-Game')
            .setStyle('LINK')
            .setURL(`${url}`)
        const joinGameRow = new MessageActionRow().addComponents(joinGameButton)
        const joinGameEmbed = new MessageEmbed()
            .setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setColor('WHITE')
            .setDescription('``MATCH FOUND ! `` \n NOW YOU CAN JOIN THE GAME BY CLICK ON THE BELOW . ')
            .setThumbnail(`${THUMBNAIL}`)

        return {
            joinGameRow,
            joinGameEmbed,
        }
    }

    static getCheckInRow(url) {
        const checkInEmbed = new MessageEmbed().setAuthor('Que Bot', `${THUMBNAIL}`)
            .setColor('WHITE')
        const checkInButton = new MessageButton().setStyle('LINK')
            .setLabel('Check-In')
            .setURL(`${url}`)
        const checkInRow = new MessageActionRow().addComponents(checkInButton)

        return {
            checkInRow,
            checkInEmbed,
        }
    }

    static getQueue() {
        const queuePlayingButton = new MessageButton().setCustomId('startQueue')
            .setLabel('Queue')
            .setStyle('SUCCESS')
        const queuePlayingRow = new MessageActionRow().addComponents(queuePlayingButton)
        const queuePlayingEmbed = new MessageEmbed().setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setColor('WHITE')
            .setDescription('Click on the button below to search for a queue. And wait for enough players to join in the queue to start the matchmaking.')
            .setThumbnail(`${THUMBNAIL}`)

        return {
            queuePlayingRow,
            queuePlayingEmbed,
        }
    }

    static startPlaying() {
        const startPlayingButton = new MessageButton()
            .setCustomId('startPlaying')
            .setLabel('Start Playing')
            .setStyle('SUCCESS')

        const startPlayingRow = new MessageActionRow()
            .addComponents(startPlayingButton)

        const startPlayingEmbed = new MessageEmbed()
            .setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setDescription('Tap on the button below to initiate the queuing process .')
            .setThumbnail(`${THUMBNAIL}`)

        return {
            startPlayingEmbed,
            startPlayingRow,
        }
    }

    static genSelectionBoard(cap1, cap2, team1, team2, remainingPlayers, playerTurn) {
        const usersBatch = _.chunk(remainingPlayers, 5)
            .map((batch) => new MessageActionRow().addComponents(batch.map((user) => user.button)))
        const playerSelectionEmbed = new MessageEmbed().setThumbnail(THUMBNAIL)
            .setColor('WHITE')
            .setDescription(`Captains mentioned below, now select your players one by one. 
            NOTE: No need to react sequentially, but just maintain the ethics and react only when its your turn 
            Its your turn : ${playerTurn ? playerTurn.mention : ''} `)
            .setAuthor('Que Bot', THUMBNAIL)
            .addField('Team A', `${cap1.mention} 🌟 \n ${team1.map((user) => user.mention).join('\n')}`, true)
            .addField('Team B', `${cap2.mention} 🌟 \n ${team2.map((user) => user.mention).join('\n')}`, true)
        if (remainingPlayers.length) {
            playerSelectionEmbed.addField('Available Players ✅', ` ${remainingPlayers.map((user) => user.mention).toString()}`, false)
        }

        return {
            embeds: [playerSelectionEmbed],
            components: usersBatch,
        }
    }

    static genMapBoard(availableMaps) {
        // TODO : If availableMps.length = 2 -> change embed and button color and text to 'pick' from 'ban'
        const mapsButton = availableMaps.map((map) => new MessageButton().setCustomId(map).setLabel(map).setStyle('DANGER'))
        const mapBatch = _.chunk(mapsButton, 3).map((batch) => new MessageActionRow().addComponents(batch))
        // TODO : Update embed
        const embed = new MessageEmbed().setDescription('TODO')

        return {
            embeds: [embed],
            components: mapBatch,
        }
    }
}

module.exports = Components
