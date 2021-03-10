import React from "react";
import styles from "./ActivityGraph.module.css";
import { MAX_BUBBLE_RADIUS, HOURS_LABELS } from "./constants";

const getCircleSize = (value) => MAX_BUBBLE_RADIUS * (value ?? 0);

const BubblesAndHours = ({ values }) => {
  return values.map((value, i) => (
    <div className={styles.hour} key={`${value}_${i}`}>
      {HOURS_LABELS[i]}
      <div
        className={styles.bubble}
        style={{
          width: getCircleSize(value),
          height: getCircleSize(value),
          transform: `translateY(${getCircleSize(value) / 2 - 50}px)`,
        }}
      />
    </div>
  ));
};

export const ActivityGraph = ({ values = new Array().fill(0) }) => {
  const amValues = values.slice(0, 12);
  const pmValues = values.slice(12);

  return (
    <div className={styles.graph}>
      <div className={styles.caption}>Activity Time</div>
      <div className={styles.timeAxis}>
        <div>
          <div className={styles.hours}>
            <BubblesAndHours values={amValues} />
          </div>
          <div className={styles.label}>am</div>
        </div>
        <div>
          <div className={styles.hours}>
            <BubblesAndHours values={pmValues} />
          </div>
          <div className={styles.label}>pm</div>
        </div>
      </div>
    </div>
  );
};
