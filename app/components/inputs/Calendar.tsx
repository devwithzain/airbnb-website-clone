"use client";
import "react-date-range/dist/styles.css";
import { TDatePickerProps } from "@/export";
import { DateRange } from "react-date-range";
import "react-date-range/dist/theme/default.css";

export default function DatePicker({
	value,
	onChange,
	disabledDates,
}: TDatePickerProps) {
	return (
		<DateRange
			rangeColors={["#262626"]}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
		/>
	);
}
