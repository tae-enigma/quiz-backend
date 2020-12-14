
/**
 * @typedef StatusQuiz
 * @property {string} NOT_STARTED
 * @property {string} FINISHED
 * @property {string} STARTED
 *
 */

class  StatusQuiz {
  static NOT_STARTED = 'not-started'
  static FINISHED = 'finished'
  static STARTED = 'started'

  /**
   *
   * @param {Date} number
   * @param {Date} date_now
   * @param {Date} start
   * @returns {string}
   */

  static getQuizStatusByStart = (limit_time, date_now, start ) =>{
    let end_time = limit_time
    if(start)
      end_time += start.getTime()

  switch (true) {
    case !start:
      return 'not-started'
      break;
    case date_now.getTime() > end_time:
      return 'finished'
      break;
    default:
      return 'started'
      break;

  }
}
}



module.exports = StatusQuiz
