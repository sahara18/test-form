import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {changeField} from 'utils/redux-form';

export default class FieldContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired
  };

  static contextTypes = {
    form: PropTypes.string
  };

  render() {
    return (
      <Field
        name={this.props.name}
        form={this.context.form}
        component={this.props.component}
      />
    );
  }
}

@connect((state, props) => {
  return {
    value: state.form.getIn([props.form, 'values', props.name])
  };
}, {changeField})
class Field extends PureComponent {
  static propTypes = {
    form: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    changeField: PropTypes.func.isRequired
  };

  @autobind
  handleChange(nextValue) {
    this.props.changeField(
      this.props.form,
      this.props.name,
      nextValue
    );
  }

  render() {
    return (
      <this.props.component
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}
