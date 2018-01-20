export function formDataSelector(form) {
  return function(state) {
    return state.form.getIn([form, 'values']);
  };
}
