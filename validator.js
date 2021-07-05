import WeValidator from "we-validator";


export function makeValidator(options = {}, onMessage = undefined) {
  if (onMessage) {
    Object.assign(options, {
      onMessage,
    })
  }

  return new WeValidator(options);
}


export function checkField(dataValidator, data, prop, callback) {
  return dataValidator.checkFields(data, [prop], function (result) {
    callback(result.msg)
  })
}

export function checkData(dataValidator, data, callback, onMessage = undefined) {
  const result = dataValidator.checkData(data, onMessage)
  if (! result) {
    return result
  }

  return callback(data)
}
