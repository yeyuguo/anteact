import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Upload, Icon, Table} from 'antd';
const Dragger = Upload.Dragger;


class PitChart extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '广告位ID',
        dataIndex: 'pitId',
        key: 'pitId',
      }, {
        title: '广告位名称',
        dataIndex: 'pitName',
        key: 'pitName',
      }, {
        title: '规格高度',
        dataIndex: 'specHeight',
        key: 'specHeight',
      }, {
        title: '规格宽度',
        dataIndex: 'specWidth',
        key: 'specWidth',
      }, {
        title: '曝光量',
        dataIndex: 'exposureCount',
        key: 'exposureCount',
      }, {
        title: '点击数',
        dataIndex: 'clickCount',
        key: 'clickCount',
      }, {
        title: '点击率',
        dataIndex: 'clickRate',
        key: 'clickRate',
      },]
  }

  render() {
    return (
      <Table rowKey="pitId" dataSource={this.props.dataSource} columns={this.columns}/>
    )
  }
}

export default PitChart