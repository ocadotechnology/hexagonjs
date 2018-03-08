/*

     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Json
  ====

  Transform that converts the ast into a json string

*/

module.exports = function () {
  return function (obj) {
    return {
      filename: obj.filename.replace('.um', '.json'),
      content: JSON.stringify(obj, null, 2)
    }
  }
}
