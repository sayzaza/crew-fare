import { EventTypes } from "../constants/EventTypes";
import { IEventTax } from "./IEventTax";

export interface IEvent {
  actionType: "enable" | "disable";
  type: EventTypes;
  name: string;
  banner: string;
  titleOnBanner: boolean;
  overlayTitle: string;
  link: string;
  address: string;
  venue: string;
  featuredHotelsTitle: string;
  minLength: number;
  bookableStartDate: string;
  bookableEndDate: string;
  checkInDate: string;
  checkOutDate: string;
  startEndDates: [Date, Date][];
  taxes: IEventTax[];
}
