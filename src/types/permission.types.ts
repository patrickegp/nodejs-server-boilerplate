export type Permission = {
  id?: number;
  created?: Date;
  updated?: Date;
  deleted?: Date | null;
  label?: string;
  action?: string
}