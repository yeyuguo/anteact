import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import {Table, Button, Modal, Switch} from 'antd'
const confirm = Modal.confirm

import {fetchList, deleteItem, enableStatus, disableStatus}from '../actions/ad'
import AdSearch from 'components/ad/AdSearch'

class AdViewPage extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      title: '广告位ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'pid',
      dataIndex: 'pid',
      key: 'pid',
    }, {
      title: '广告位名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属媒体',
      dataIndex: 'appName',
      key: 'appName',
    }, {
      title: '广告位规格',
      dataIndex: 'adSpecName',
      key: 'adSpecName',
    }, {
      title: '修改日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '广告位状态',
      key: 'status',
      render: (text, record, index) => (
        <span>
          <Switch defaultChecked={record.status === 1} onChange={this.handleSwitchChange.bind(this, record, index)}/>
        </span>
      )
    }, {
      title: '操作',
      key: 'actions',
      render: (text, record, index) => (
        <div className="actions">
          <Button size="small" onClick={this.handleEditItem.bind(this, record)}>编辑</Button>
          <Button size="small" disabled={record.status === 1}
                  onClick={this.handleDeleteItem.bind(this, record, index)}>删除</Button>
        </div>
      )
    }]

    this.fetchList = this.fetchList.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  componentWillMount() {
    this.page = parseInt(this.context.router.params.page) || 1
    this.fetchList({page: this.page})
  }

  // 获取数据
  fetchList(params) {
    params = Object.assign({}, {
      pageSize: 10,
      page: 1
    }, params)
    this.props.fetchList(params)
  }

  // 进入编辑页
  handleEditItem(record) {
    console.log(record)
    this.context.router.push('/page/ad/edit/' + record.id)
  }

  // 删除单项
  handleDeleteItem(record) {
    const self = this
    confirm({
      title: '确认删除这个项目么?',
      onOk() {
        return self.props.deleteItem({id: record.id})
      },
      onCancel() {
      },
    })
  }

  // 切换状态
  handleSwitchChange(record, index, status) {
    console.log(record, index, status)
    if (status) {
      this.props.enableStatus({id: record.id, index: index})
    } else {
      this.props.disableStatus({id: record.id, index: index})
    }
    this.forceUpdate()
  }

  // 分页
  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter)
    const page = pagination.current
    const pageSize = pagination.pageSize
    this.fetchList({page: page, pageSize: pageSize})
    this.context.router.push('/page/ad/overview/' + page)

  }

  render() {
    const {adList} = this.props

    return (
      <div className="overview ad-overview-page">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <AdSearch onSearch={this.fetchList}/>

          <Button type="primary">
            <Link to="/page/ad/new">新建广告位</Link>
          </Button>
        </div>
        <div className="grid ad-grid" style={{padding: '10px 20px'}}>
          <Table rowKey="id"
                 dataSource={adList.list}
                 columns={this.columns}
                 pagination={{defaultCurrent: this.page, total: adList.totalCount, pageSize: 10}}
                 onChange={this.handleTableChange}/>
        </div>
      </div>
    )
  }
}
AdViewPage.contextTypes = {
  router: PropTypes.object.isRequired
}

AdViewPage.propTypes = {
  adList: PropTypes.object.isRequired,
  fetchList: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  enableStatus: PropTypes.func.isRequired,
  disableStatus: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {adList} = state
  return {
    adList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchList(params) {
      dispatch(fetchList(params))
    },
    deleteItem(params) {
      dispatch(deleteItem(params))
    },
    enableStatus(params){
      dispatch(enableStatus(params))
    },
    disableStatus(params){
      dispatch(disableStatus(params))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdViewPage)
