export const getTransition = (
  property: string | string[] = "all",
  duration: string = "0.125s",
  timingFunction: string = "ease"
) => {
  if (typeof property === "string")
    return `${property} ${duration} ${timingFunction}`;

  return property
    .map((prop) => `${prop} ${duration} ${timingFunction}`)
    .join(", ");
};
