import dayjs from "dayjs";

const MS_IN_HOUR = 3600000;

export const getInitials = () => new Array(24).fill(0);

export const isInTimeRange = (
  rangeStartTime,
  rangeEndTime,
  recordStartedAt,
  recordCompletedAt
) => {
  return (
    recordStartedAt < recordCompletedAt &&
    recordStartedAt < rangeEndTime &&
    recordCompletedAt > rangeStartTime
  );
};

export const getDayHourlyPoints = (date) => {
  const today = dayjs(date).startOf("day");
  const points = [];

  for (let i = 0; i < 25; i++) {
    points.push(today.valueOf() + MS_IN_HOUR * i);
  }

  return points;
};

export const aggregate = (date, records = []) => {
  const points = getDayHourlyPoints(date);

  const result = points
    .slice(0, -1)
    .reduce((msPerHourAcc, currentPoint, pointIdx) => {
      const nextPoint = points[pointIdx + 1];

      const aggr = records.reduce((perPointAcc, record) => {
        const { started_at: startedAt, completed_at: completedAt } = record;

        if (isInTimeRange(currentPoint, nextPoint, startedAt, completedAt)) {
          return (
            perPointAcc +
            Math.min(nextPoint, completedAt) -
            Math.max(currentPoint, startedAt)
          );
        }
        return perPointAcc;
      }, 0);

      msPerHourAcc[pointIdx] = aggr;
      return msPerHourAcc;
    }, getInitials());

  return result;
};

export const normalize = (aggregatedArray) => {
  const max = Math.max(...aggregatedArray);
  return aggregatedArray.map((v) => v / max);
};

export const processData = (date, records) =>
  normalize(aggregate(date, records));
