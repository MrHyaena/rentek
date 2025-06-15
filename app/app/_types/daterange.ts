//Daterange context type
export interface Daterange {
  startDate: Date;
  endDate: Date;
  startIsValid: boolean;
  endIsValid: boolean;
}

export type DaterangeContextType = {
  daterange: Daterange;
  setDaterange: any;
  saleIndex: number;
  numberOfDays: number;
  setNumberOfDays: any;
};
