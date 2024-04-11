import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {user} from "../models/user-Administration.model"

export const GetUsersActions = createActionGroup({
  source: '[USER] get users',
  events: {
    do: emptyProps(),
    success: props<{users : user[]}>(),
    fail: emptyProps,
  }
});
