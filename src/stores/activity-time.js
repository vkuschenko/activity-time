import { makeAutoObservable } from "mobx";
import { getFakeData } from "../mock-data";
import { processData } from "../utils";

export class ActivityTime {
  records = [];
  selectedDate = Date.now();

  constructor() {
    getFakeData(this.selectedDate).then((records) => {
      this.records = processData(this.selectedDate, records);
    });

    makeAutoObservable(this);
  }

  getRecordsForDate(date) {
    this.selectedDate = date;

    getFakeData(date).then((records) => {
      this.records = processData(date, records);
    });
  }
}

export const activityTime = new ActivityTime();
