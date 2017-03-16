import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import * as actions from '../actions/fuelSavingsActions';


import {Form, Input, Tooltip, Icon, Checkbox, Button, Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class DocViewPage extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="overview doc-overview-page">
        <Tabs defaultActiveKey="2">
          <TabPane tab={<span><Icon type="apple"/>IOS版本</span>} key="1">
            ios开发
            <Link to="/page/doc/release">查看更新日志</Link>
          </TabPane>
          <TabPane tab={<span><Icon type="android"/>Android版本</span>} key="2">
            Android开发
          </TabPane>
          <TabPane tab={<span><Icon type="android"/>JSSDK版本</span>} key="3">
            JavaScript开发
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

DocViewPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocViewPage);
