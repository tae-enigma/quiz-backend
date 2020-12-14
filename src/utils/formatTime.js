module.exports = {
  /**
   *
   * @param {String} timeString
   * @returns {Number}
   */
  timeStringToMillisecods: (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(value => parseInt(value))

    var milliseconds = 0

    milliseconds += hours * 60 * 60 * 1000
    milliseconds += minutes * 60 * 1000
    milliseconds += seconds * 1000

    return milliseconds
  },
  /**
   *
   * @param {Number} milliseconds
   * @returns {String}
   */
  millisecondsToTimeString: (milliseconds) => {
    // let millis = milliseconds % 1000;
    let second = parseInt((milliseconds / 1000) % 60);
    let minute = parseInt((milliseconds / (1000 * 60)) % 60);
    let hour = parseInt( (milliseconds / (1000 * 60 * 60)) % 24);

    console.log(hour)

    return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
  }
}
