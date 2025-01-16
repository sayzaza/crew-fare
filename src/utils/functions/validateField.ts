export const validateField = (value: any, name: string) => {
  if (typeof value === "string" && !value)
    return `Please enter the ${name} of the event`;
  if (typeof value === "number" && value <= 0)
    return `The ${name} must be greater than 0`;
};
