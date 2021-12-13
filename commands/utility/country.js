const Discord = require('discord.js');
const config = require('../../config');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'country',
        description: '',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    const country = args.slice().join(' ');
		if(!country) {
			return message.channel.send(
				':x: Proporcione un país válido.',
			);
		}
		const url = 'https://restcountries.eu/rest/v2/name/' + country;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				':x:¡Ocurrió un error!',
			);
		}
		try{
			const data = response[0];
			const embed = new MessageEmbed()
				.setColor(config.embedcolor)
				.setTitle(data.name)
				.setThumbnail(`https://www.countryflags.io/${data.alpha2Code}/flat/64.png`)
				.setFooter(`Pedido por ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Nombre Nativo', value: `\`\`\`${data.nativeName}\`\`\``, inline: true },
					{ name: 'Capital', value: `\`\`\`${data.capital ? data.capital : 'Ninguna'}\`\`\``, inline: true },
					{ name: 'Locacion', value: `\`\`\`${data.subregion ? data.subregion : data.region}\`\`\``, inline: true },
					{ name: 'Moneda', value: `\`\`\`${data.currencies[0].code} ${data.currencies[0].symbol}\`\`\``, inline: true },
					{ name: 'Poblacion', value: `\`\`\`${data.population.toLocaleString()}\`\`\``, inline: true },
					{ name: 'Area', value: `\`\`\`${data.area.toLocaleString()}km\`\`\``, inline: true },
					{ name: 'Idiomas', value: `\`\`\`${data.languages.map(lang => lang.name).join('/')}\`\`\`` },
				);
			message.channel.send(embed);
		}
		catch{
			return message.channel.send(
				':x: Proporcione un país válido.',
			);
		}
    }
}
