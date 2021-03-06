module.exports.func = function (bot, msg){
async function purge(message) {
  const user = message.mentions.users.first();
  let amount = parseInt(message.content.split(' ').pop());

  if (!user && !amount) return message.reply('Syntax: [mention or amount] [amount]');
  if (!amount) return message.reply('Specify an amount');

  if (user) {
    const messages = (await message.channel.fetchMessage({ limit: amount }))
      .filter(m => m.author.id === user.id)
      .filter(m => m.deletable);

    if (!message.size) return [];

    if (messages.size === 1) {
      return [await messages.first().delete()];
    }

    return [await message.channel.bulkDelete(messages)];
  } else {
    if (amount === 0 || amount === 1) {
      return [await message.delete()];
    }

    return [await message.channel.bulkDelete(amount)];
  }
};
};
