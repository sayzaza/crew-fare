export const getNextMonthDate = () => {
	const today = new Date();
	const nextMonth = new Date();
	nextMonth.setMonth(nextMonth.getMonth() + 1);

	return [today,nextMonth]
}