import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {mountForm, unmountForm, changeField, resetForm} from './model';

export default options => {
  return ComposedComponent => {
    @connect(null, {mountForm, unmountForm, changeField, resetForm})
    class ReduxForm extends PureComponent {
      static propTypes = {
        mountForm: PropTypes.func.isRequired,
        unmountForm: PropTypes.func.isRequired,
        changeField: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired
      };

      componentWillMount() {
        this.props.mountForm(options);
      }

      componentWillUnmount() {
        this.props.unmountForm(options.form);
      }

      render() {
        return (
          <ComposedComponent
            {...this.props}
            changeField={this.props.changeField.bind(null, options.form)}
            resetForm={this.props.resetForm.bind(null, options.form)}
          />
        );
      }
    }

    return ReduxForm;
  };
};
