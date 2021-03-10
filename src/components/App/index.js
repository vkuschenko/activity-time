import React, { useState } from "react";
import styles from "./App.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ActivityGraph } from "../ActivityGraph";
import { processData } from "../../utils";
import { getFakeData } from "../../mock-data";

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const data = processData(selectedDate, getFakeData(selectedDate));
  debugger;

  return (
    <div className={styles.app}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <ActivityGraph values={data} />
    </div>
  );
};
