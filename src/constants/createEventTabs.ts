import CreateEventBasicInfoForm from "../components/CreateEventPage/CreateEventMain/CreateEventBasicInfoForm/CreateEventBasicInfoForm";
import CreateEventDetailsForm from "../components/CreateEventPage/CreateEventMain/CreateEventDetailsForm/CreateEventDetailsForm";
import CreateEventDatesForm from "../components/CreateEventPage/CreateEventMain/CreateEventDatesForm/CreateEventDatesForm";

export enum ECreateEventTabKeys {
  BASIC = "BASIC",
  DETAILS = "DETAILS",
  DATES = "DATES",
}

export const CREATE_EVENT_TABS = {
  [ECreateEventTabKeys.BASIC]: {
    title: "Basic Information",
    component: CreateEventBasicInfoForm,
  },
  [ECreateEventTabKeys.DETAILS]: {
    title: "Details",
    component: CreateEventDetailsForm,
  },
  [ECreateEventTabKeys.DATES]: {
    title: "Dates",
    component: CreateEventDatesForm,
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
