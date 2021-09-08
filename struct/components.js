const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const { constant } = require('lodash')
const _ = require('lodash')

const {
    THUMBNAIL, MATCH_FOUND_IMAGE, SELECT_MAP, SELECT_SIDE, ATTACKER, DEFENDER, ASCENT, BIND, BREEZE, ICEBOX, SPLIT, HAVEN,
} = process.env

class Components {
    static getJoinGame(url) {
        const joinGameButton = new MessageButton().setLabel('Join-Game')
            .setStyle('LINK')
            .setURL(`${url}`)
        const joinGameRow = new MessageActionRow().addComponents(joinGameButton)
        const joinGameEmbed = new MessageEmbed()
            .setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setColor('WHITE')
            .setDescription(' Now, You can join the game by clicking on the button below. ')
            .setThumbnail(`${THUMBNAIL}`)
            .setImage(MATCH_FOUND_IMAGE)

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

    static genMapBoard(availableMaps, playerTurn, i) {
        // TODO : If availableMps.length = 2 -> change embed and button color and text to 'pick' from 'ban'
        let buttonColor = 'DANGER'
        let image = SELECT_MAP

        const turn = `Its your turn : ${playerTurn ? playerTurn.mention : ''}`
        let description = `Ban maps one by one by clicking on buttons below. ${turn} `
        if (availableMaps[0] === 'Attacker') {
            description = `Now, choose the side ${turn}`
            image = SELECT_SIDE
        }
        if (availableMaps.length === 2 && availableMaps[0] !== 'Attacker') {
            description = ` Now PICK one to choose the final map. ${turn}`
            buttonColor = 'SUCCESS'
        }

        if (!availableMaps.length) {
            if (i === 'Attacker') {
                description = ` You have choosen Attacker side `
                image = ATTACKER
            }
            if (i === 'Defender') {
                description = ` You have choosen Defender side `
                image = DEFENDER
            }
        }
        // TODO : Update embed
        const embed = new MessageEmbed()
            .setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setDescription(`${description} `)
            .setThumbnail(`${THUMBNAIL}`)
            .setColor('WHITE')
            .setImage(`${image}`)

        const mapsButton = availableMaps.map((map) => new MessageButton().setCustomId(map).setLabel(map).setStyle(buttonColor))
        const mapBatch = _.chunk(mapsButton, 3).map((batch) => new MessageActionRow().addComponents(batch))

        return {
            embeds: [embed],
            components: mapBatch,
        }
    }

    static mapComponents(availableMaps, i) {
        // let selectedMapImage = 'notSelected'
        // if (i === 'Bind') {
        //     selectedMapImage = BIND
        // }
        // if (i === 'Ascent') {
        //     selectedMapImage = ASCENT
        // }
        // if (i === 'Split') {
        //     selectedMapImage = SPLIT
        // }
        // if (i === 'Icebox') {
        //     selectedMapImage = ICEBOX
        // }
        // if (i === 'Breeze') {
        //     selectedMapImage = BREEZE
        // }
        // if (i === 'Heaven') {
        //     selectedMapImage = HAVEN
        // }

        const selectedMapComponents = new MessageEmbed()
            .setAuthor('QUE Bot', `${THUMBNAIL}`)
            .setDescription(`You have selected ${i} for this match.`)
            .setThumbnail(`${THUMBNAIL}`)
            .setColor('WHITE')
            // .setImage(`${selectedMapImage}`)

        return {
            embeds: [selectedMapComponents],
        }
    }
}

module.exports = Components
