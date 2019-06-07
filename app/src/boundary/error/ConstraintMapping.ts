export default interface ConstraintMapping {
  [key: string]: {
    message: string;
    field?: string;
  };
}
