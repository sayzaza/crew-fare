import { IEvent } from "../models/IEvent";

type EventFields = keyof IEvent;


export const createEventFieldErrorNames: {[key in EventFields]?: string} = {
    name: "name",
    overlayTitle: "overlay title",
    link: "link",
    address: "address",
    venue: "venue name",
    featuredHotelsTitle: "featured hotels title",
    minNights: "minimum nights"
}