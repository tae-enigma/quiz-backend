const NOT_STARTED = 'not-started';
const FINISHED = 'finished';
const STARTED = 'started';

module.exports = {
  NOT_STARTED,
  FINISHED,
  STARTED,
  /**
   * @typedef { object } Request
   * @property { number } time_limit
   * @property { Date } start_time
   *
   * @param { Request } param
   * @returns { 'not-started' | 'finished' | 'started' } return a quiz status constant
   */
  getQuizStatusByStartTime: ({ time_limit, start_time }) => {
    if (!start_time) return NOT_STARTED;

    const current_time = Date.now();
    const end_time = start_time.getTime() + time_limit;

    return current_time > start_time && current_time < end_time
      ? STARTED
      : FINISHED;
  },
};
