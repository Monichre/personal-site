import React from "react";
import { CalendarCanvas } from "@nivo/calendar";

export interface ContributionCalendarProps {
  contributionCalendar: any;
}

export const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  contributionCalendar,
}) => {
  const { weeks, months, colors } = contributionCalendar;

  const { firstDay } = months[0];

  const { firstDay: lastDay } = months[months.length - 1];

  const data: any = [].concat(
    [],
    ...weeks.map(({ contributionDays }) =>
      contributionDays.map(({ date: day, contributionCount: value }) => ({
        value,
        day,
      }))
    )
  );

  return (
    <CalendarCanvas
      data={data}
      theme={{ textColor: "#fff" }}
      from={firstDay}
      margin={{ top: 40, right: 40, bottom: 50, left: 40 }}
      align="top"
      height={500}
      width={500}
      to={lastDay}
      emptyColor="#131212"
      colors={colors}
      // monthBorderColor="#ffffff"
      dayBorderWidth={2}
      // dayBorderColor="#ffffff"
    />
  );
};
