import {createAction, props} from '@ngrx/store';

export const increment = createAction('Increment');
export const decrement = createAction('Decrement');
export const reset = createAction('Reset');
export const rename = createAction('Rename', props<{counterName:string}>());
export const customIncrement = createAction('CustomIncrement', props<{value:number, action:string}>())
