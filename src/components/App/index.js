import React, { useState } from "react";
import styles from "./App.module.css";
import DatePicker from "react-datepicker";
import { observer } from "mobx-react";
import "react-datepicker/dist/react-datepicker.css";
import { ActivityGraph } from "../ActivityGraph";

export const App = ({ selectedDate, records, onDateChange }) => (
  <div className={styles.app}>
    <div className={styles.datePickerWrapper}>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        className={styles.datePicker}
      />
    </div>
    <ActivityGraph values={records} />
  </div>
);

export default observer(({ activityTime }) => (
  <App
    selectedDate={activityTime.selectedDate}
    records={activityTime.records}
    onDateChange={(date) => activityTime.getRecordsForDate(date)}
  />
));
