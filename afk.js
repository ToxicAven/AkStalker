function inject (bot, option) {
  bot.afk = {}

  let afkInterval, rotation

  bot.afk.start = async () => {
    afkInterval = setInterval(async () => {
      if (rotation) {
        await bot.look(0, Math.PI)
        bot.swingArm('right')
        rotation = false
      } else {
        await bot.look(Math.PI, 0)
        bot.swingArm('right')
        rotation = true
      }
    }, 3000)
  }

  bot.afk.stop = () => {
    if (afkInterval) {
      clearInterval(afkInterval)
    }
  }
}

module.exports = {
  afk: inject
}