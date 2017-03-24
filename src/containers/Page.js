import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';

import AppHeader from '../components/Header'
import Nav from '../components/Nav'

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Page extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   browserHistory.listen((ev) => {
  //     console.log(this.props)
  //   });
  // }

  render() {
    return (
      <div className="Page">
        <Layout>
          <AppHeader router={this.props}/>
          <Layout>
            <Sider width={200} style={{background: '#fff'}}>
              <Nav />
            </Sider>
            <Layout style={{padding: '0 15px 15px'}}>
              {this.props.children}
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.element
};

export default Page;
