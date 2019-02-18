import { Icon, Input } from 'antd';
import React from 'react';
import { reduxForm, Field } from 'redux-form';

@reduxForm({ form: 'torre' })
class TorreSearchForm extends React.Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name='username' component={this.renderInput} />
      </form>
    );
  }

  renderInput(props) {
    return <Input addonAfter={<Icon type='search' />} placeholder='Search Torre Bio' {...props.input} />;
  }

}

export default TorreSearchForm;