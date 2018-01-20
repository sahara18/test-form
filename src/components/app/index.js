import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {reduxForm, Field, formDataSelector} from 'utils/redux-form';
import './style.css';

const getFormData = formDataSelector('loginForm');

@reduxForm({
  form: 'loginForm',
  initialValues: {
    login: '',
    password: ''
  }
})
@connect(state => {
  return {
    data: getFormData(state)
  };
})
export default class App extends PureComponent {
  static propTypes = {
    data: ImmutablePropTypes.map.isRequired,
    changeField: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  @autobind
  handleChange(field, e) {
    this.props.changeField(field, e.target.value);
  }

  @autobind
  handleSubmit() {
    alert(this.props.data);
  }

  render() {
    return (
      <div>
        <div>Form</div>

        <div>
          <Field
            name="login"
            component={Login}
          />
        </div>

        <div>
          <Field
            name="password"
            component={Password}
          />
        </div>

        <div>
          <button onClick={this.handleSubmit}>
            Submit
          </button>

          <button onClick={this.props.resetForm}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

class Login extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @autobind
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        placeholder="Login"
      />
    );
  }
}

class Password extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @autobind
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input
        type="password"
        value={this.props.value}
        onChange={this.handleChange}
        placeholder="Password"
      />
    );
  }
}
