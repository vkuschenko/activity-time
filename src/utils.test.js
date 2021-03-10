import dayjs from "dayjs";
import {
  getInitials,
  isInTimeRange,
  getDayHourlyPoints,
  aggregate,
  normalize,
} from "./utils";

describe("src > utils", () => {
  describe("isInTimeRange", () => {
    test.each([
      [
        new Date(2021, 2, 7, 1, 15, 15, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 25, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 25, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 35, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 21, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 29, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 15, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 35, 0).getTime(),
      ],
    ])("Should be in range", (recordStartedAt, recordCompletedAt) => {
      const rangeStartTime = new Date(2021, 2, 7, 1, 15, 20, 0).getTime();
      const rangeEndTime = new Date(2021, 2, 7, 1, 15, 30, 0).getTime();

      expect(
        isInTimeRange(
          rangeStartTime,
          rangeEndTime,
          recordStartedAt,
          recordCompletedAt
        )
      ).toBe(true);
    });

    test.each([
      [
        new Date(2021, 2, 7, 1, 15, 10, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 15, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 15, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 20, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 30, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 35, 0).getTime(),
      ],
      [
        new Date(2021, 2, 7, 1, 15, 35, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 40, 0).getTime(),
      ],
      // swapped by some reason
      [
        new Date(2021, 2, 7, 1, 15, 29, 0).getTime(),
        new Date(2021, 2, 7, 1, 15, 21, 0).getTime(),
      ],
    ])("Should not be in range ", (recordStartedAt, recordCompletedAt) => {
      const rangeStartTime = new Date(2021, 2, 7, 1, 15, 20, 0).getTime();
      const rangeEndTime = new Date(2021, 2, 7, 1, 15, 30, 0).getTime();

      expect(
        isInTimeRange(
          rangeStartTime,
          rangeEndTime,
          recordStartedAt,
          recordCompletedAt
        )
      ).toBe(false);
    });
  });

  describe("getDayHourlyPoints", () => {
    test("Should produce correct number of check points", () => {
      const today = Date(2021, 2, 10, 1, 36, 30, 0);
      const points = getDayHourlyPoints(today);

      expect(points).toHaveLength(25);
    });

    test("Should produce correct check points", () => {
      const today = Date(2021, 2, 10, 1, 36, 30, 0);
      const points = getDayHourlyPoints(today);
      const first = dayjs(points[0]);
      const last = dayjs(points[points.length - 1]);

      expect(first.add(1, "day").isSame(last)).toBe(true);
    });
  });

  describe("aggregate", () => {
    test("Should aggregate properly if record hits the target day", () => {
      const targetDate = new Date(2021, 2, 7, 0, 0, 0, 0);
      const records = [
        {
          started_at: new Date(2021, 2, 7, 21, 15, 20, 0).getTime(),
          completed_at: new Date(2021, 2, 7, 21, 15, 35, 0).getTime(),
        },
      ];

      const expected = getInitials();
      expected[21] = 15000;

      expect(aggregate(targetDate, records)).toEqual(expected);
    });

    test("Should return zero filled aggregate properly if record miss the target day", () => {
      const targetDate = new Date(2021, 2, 8, 0, 0, 0, 0);
      const records = [
        {
          started_at: new Date(2021, 2, 7, 21, 15, 20, 0).getTime(),
          completed_at: new Date(2021, 2, 7, 21, 15, 35, 0).getTime(),
        },
      ];

      const expected = getInitials();

      expect(aggregate(targetDate, records)).toEqual(expected);
    });
  });

  describe("normalize", () => {
    test("Should normalize values at given array", () => {
      const input = [1, 2, 4, 2];
      const expected = [0.25, 0.5, 1, 0.5];
      expect(normalize(input)).toEqual(expected);
    });
  });
});
