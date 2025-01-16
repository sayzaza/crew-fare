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
  minNights: number;
  bookableStartDate: Date | "";
  bookableEndDate: Date | "";
  checkInDate: Date | "";
  checkOutDate: Date | "";
  startEndDates: { start: Date | ""; end: Date | "",id: string }[];
  taxes: IEventTax[];
}
