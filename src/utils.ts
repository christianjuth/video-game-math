export const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");
