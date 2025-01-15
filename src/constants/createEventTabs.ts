import CreateEventBasicInfoForm from "../components/CreateEventPage/CreateEventMain/CreateEventBasicInfoForm/CreateEventBasicInfoForm";
import CreateEventDetailsForm from "../components/CreateEventPage/CreateEventMain/CreateEventDetailsForm/CreateEventDetailsForm";
import CreateEventDatesForm from "../components/CreateEventPage/CreateEventMain/CreateEventDatesForm/CreateEventDatesForm";
import { IEvent } from "../models/IEvent";
import { useFormValue } from "../hooks/useFormValue";

export enum ECreateEventTabKeys {
  BASIC = "BASIC",
  DETAILS = "DETAILS",
  DATES = "DATES",
}

type UseFormvalueReturnType = ReturnType<typeof useFormValue<IEvent>>;

export interface CreateEventTabProps {
  formData: IEvent;
  onChange: UseFormvalueReturnType["onChange"];
  onChangeSelect: UseFormvalueReturnType["onChangeSelect"];
  error: UseFormvalueReturnType["error"];
}

type EventFields = keyof IEvent;

export const CREATE_EVENT_TABS: {
  [key in ECreateEventTabKeys]: {
    title: string;
    component: React.FC<CreateEventTabProps>;
    fields: EventFields[];
  };
} = {
  [ECreateEventTabKeys.BASIC]: {
    title: "Basic Information",
    component: CreateEventBasicInfoForm,
    fields: [
      "actionType",
      "type",
      "name",
      "banner",
      "titleOnBanner",
      "overlayTitle",
    ],
  },
  [ECreateEventTabKeys.DETAILS]: {
    title: "Details",
    component: CreateEventDetailsForm,
    fields: ["link", "address", "venue", "featuredHotelsTitle", "minLength"],
  },
  [ECreateEventTabKeys.DATES]: {
    title: "Dates",
    component: CreateEventDatesForm,
    fields: [
      "bookableStartDate",
      "bookableEndDate",
      "checkInDate",
      "checkOutDate",
      "startEndDates",
      "taxes",
    ],
  },
};

export const CREATE_EVENT_TABS_ARRAY = Object.keys(CREATE_EVENT_TABS).map(
  (k) => {
    const key = k as ECreateEventTabKeys;
    return {
      ...CREATE_EVENT_TABS[key],
      key,
    };
  }
);
