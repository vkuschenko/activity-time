import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(isToday);

function getRandomInt(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin) + newMin);
}

export const fixedData = [
  {
    serial: "XCPTP225715FPPUP",
    label: "Back yard 1",
    description: "Back yard camera 1",
    started_at: dayjs().hour(12).minute(15).second(20).valueOf(),
    completed_at: dayjs().hour(12).minute(15).second(30).valueOf(),
    duration: 10000,
  },
  {
    serial: "XCPTP225715FPPUP",
    label: "Back yard 1",
    description: "Back yard camera 1",
    started_at: dayjs().hour(12).minute(15).second(20).valueOf(),
    completed_at: dayjs().hour(12).minute(15).second(30).valueOf(),
    duration: 15000,
  },
  {
    serial: "XCPTP225715FPPUP",
    label: "Back yard 1",
    description: "Back yard camera 1",
    started_at: dayjs().hour(20).minute(0).second(0).valueOf(),
    completed_at: dayjs().hour(20).minute(0).second(10).valueOf(),
    duration: 20000,
  },
];

export const generateData = (date) => {
  const rndRecordsCount = getRandomInt(0, 100);
  const records = [];

  for (let i = 0; i < rndRecordsCount; i++) {
    const rndHour = getRandomInt(0, 24);
    const rndMinute = getRandomInt(0, 60);
    const rndSecond = getRandomInt(0, 60);
    const startedAt = dayjs(date)
      .hour(rndHour)
      .minute(rndMinute)
      .second(rndSecond);
    const completedAt = startedAt.add(getRandomInt(0, 21601), "second"); // up to 6 hours

    records.push({
      serial: uuidv4(),
      label: `fake label ${i}`,
      description: `fake description ${i}`,
      started_at: startedAt.valueOf(),
      completed_at: completedAt.valueOf(),
      duration: completedAt - startedAt,
    });
  }

  return records;
};

export const getFakeData = (date) => {
  if (dayjs(date).isToday()) {
    return fixedData;
  }
  return generateData(date);
};
