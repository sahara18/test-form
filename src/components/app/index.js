import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';
import {reduxForm} from 'utils/redux-form';
import './style.css';

@reduxForm({
  form: 'loginForm',
  initialValues: {
    login: '',
    password: ''
  }
})
@connect(state => {
  return {
    data: state.form.getIn(['loginForm', 'values'])
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
          <input
            type="text"
            value={this.props.data.get('login')}
            onChange={this.handleChange.bind(null, 'login')}
            placeholder="Login"
          />
        </div>

        <div>
          <input
            type="password"
            value={this.props.data.get('password')}
            onChange={this.handleChange.bind(null, 'password')}
            placeholder="Password"
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
