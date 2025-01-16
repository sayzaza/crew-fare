export const validateField = (value: any, name: string) => {
  if (typeof value === "string" && !value)
    return `Please enter the ${name} of the event`;
  if (typeof value === "number" && value <= 0)
    return `The ${name} must be greater than 0`;
};

type DateType = Date | "";
export const validateDateByBookableDates = (
  values: [DateType, DateType],
  names: [string, string],
  bookableDates: [DateType, DateType]
) => {
  const unfilledFieldIndex = values.findIndex((item) => !item);
  if (unfilledFieldIndex !== -1) {
    return `Please enter the ${names[unfilledFieldIndex]} of the event`;
  }
  if (bookableDates.find((item) => !item)) return "Please Fill Bookable Dates";

  if (new Date(values[0]) < new Date(bookableDates[0])) {
    return `${names[0]} must be bigger than bookable start date`;
  }

  if (new Date(values[1]) > new Date(bookableDates[1])) {
    return `${names[1]} must be smaller than bookable end date`;
  }
};
