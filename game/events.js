require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = { OnStart };

async function OnStart(channel, client) {
    const query = await client.sequelize.models.Channel.findOne({
        where: {
            id: channel.id,
        },
    });

    if (!query) {
        return;
    }

    const filter = m => !(m.author.bot || m.content.startsWith(process.env.IGNORE_PREFIX));
    client.collectors.set(channel.id, channel.createMessageCollector({ filter }));

    const collector = client.collectors.get(channel.id);

	collector.on('collect', message => {
		OnMessage(message, client)
	});

	collector.on('end', collected => {
		OnEnd(collected, client);
	});

    const startEmbed = new EmbedBuilder()
		.setColor(0xed1c24)
		.setTitle(`Ready, set, WordChain!`);

    if (query.dataValues.highscore === 0) {
        startEmbed.setDescription(`The game has started! Messages starting with \`${process.env.IGNORE_PREFIX}\` will be ignored. Have fun!`);
    } else {
        startEmbed.setDescription(`The high score in this channel is ${query.dataValues.highscore}. Break it!`);
    }

    await channel.send({ embeds: [startEmbed] })
}

function OnEnd(collected, client) {
    console.log(collected)
    // TODO
}

function OnMessage(message, client) {
    console.log(message)
    // TODO
}