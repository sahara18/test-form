import {fromJS} from 'immutable';

const MOUNT_FORM = 'redux-form/MOUNT_FORM';
const CHANGE_FIELD = 'redux-form/CHANGE_FIELD';
const RESET_FORM = 'redux-form/RESET_FORM';
const UNMOUNT_FORM = 'redux-form/UNMOUNT_FORM';

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case MOUNT_FORM:
      return state.set(
        action.payload.form,
        fromJS({
          values: action.payload.initialValues || {},
          initialValues: action.payload.initialValues || {}
        })
      );

    case CHANGE_FIELD:
      return state.setIn(
        [action.payload.form, 'values', action.payload.field],
        action.payload.value
      );

    case RESET_FORM:
      return state.setIn(
        [action.payload.form, 'values'],
        state.getIn([action.payload.form, 'initialValues'])
      );

    case UNMOUNT_FORM:
      return state.remove(action.payload.form);

    default:
      return state;
  }
};

export function mountForm({form, initialValues}) {
  return {
    type: MOUNT_FORM,
    payload: {form, initialValues}
  };
}

export function changeField(form, field, value) {
  return {
    type: CHANGE_FIELD,
    payload: {form, field, value}
  };
}

export function resetForm(form) {
  return {
    type: RESET_FORM,
    payload: {form}
  };
}

export function unmountForm(form) {
  return {
    type: UNMOUNT_FORM,
    payload: {form}
  };
}
