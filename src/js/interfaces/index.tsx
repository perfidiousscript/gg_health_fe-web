export interface Practice {
  name: string;
  id: number;
  contact: Contact[];
  staff: number[];
}

export interface Contact {
  type: string;
  value: string;
}

export interface RowArray {
  type: string;
  value: string;
}

export interface BasePropsInterface {
  isFetching: boolean;
  responseStatus: string;
  error: string;
  history?: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}
