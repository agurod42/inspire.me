import { Layout } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import appStore from '@/redux/app.store';

export default class extends React.Component {

  render() {
    return (
      <Provider store={appStore}>
        <Layout>
          <Layout.Header>
            {/* <img src={require('./assets/logo.png')} /> */}
          </Layout.Header>
          <Layout.Content>
            { this.props.children }
          </Layout.Content>
        </Layout>
      </Provider>
    );
  }

}