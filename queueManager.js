const { Collection } = require('discord.js')

class QueueManager {
    constructor(opts) {
        this.client = opts.client
        this.queueSize = 1
        this.queue = new Collection()
    }

    addToQueue(interaction) {
        if (this.queue.has(interaction.user.id)) throw new Error('user already queued')
        this.queue.set(interaction.user.id, interaction)
        this.processQueue().then()
    }

    isQueued(userId) {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        console.log(userId)
        return this.queue.has(userId)
    }

    async processQueue() {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        if (this.queue.size >= this.queueSize) {
            this.queueCopy = this.queue.clone()
            this.queue = new Collection()
            await Promise.all(this.queueCopy.map(async (interaction) => {
                await interaction.editReply(`you're matched`)
            }))
        }
    }
}

module.exports = QueueManager
