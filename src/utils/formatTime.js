module.exports = {
  /**
   *
   * @param {String} timeString
   * @returns {Number}
   */
  timeStringToMilliseconds: timeString => {
    const timeArray = timeString.split(':');

    const [hours, minutes, seconds] = timeArray.map(value => Number(value));

    let milliseconds = 0;

    milliseconds += hours * 60 * 60 * 1000;
    milliseconds += minutes * 60 * 1000;
    milliseconds += (seconds || 0) * 1000;

    return milliseconds;
  },
  /**
   *
   * @param {Number} milliseconds
   * @returns {String}
   */
  millisecondsToTimeString: milliseconds => {
    // let millis = milliseconds % 1000;
    const second = Number((milliseconds / 1000) % 60);
    const minute = Number((milliseconds / (1000 * 60)) % 60);
    const hour = Number((milliseconds / (1000 * 60 * 60)) % 24);

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(
      2,
      '0',
    )}:${String(second).padStart(2, '0')}`;
  },
};
