import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;

function RightList() {

  const [dataSource, setDataSource] = useState([])

  const showConfirm = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteMethod = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:5050/rights/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      axios.delete(`http://localhost:5050/children/${item.id}`)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5050/rights?_embed=children').then(res => {
      const list = res.data
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      });
      setDataSource(list)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => <Tag color='orange'>{key}</Tag>
    },
    {
      title: '操作',
      render: (item) =>
        <>
          <Button onClick={() => showConfirm(item)} danger shape="circle" icon={<DeleteOutlined />} />
          <Popover content={
            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)} />
          } title="配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
            <Button disabled={item.pagepermisson === undefined} type="primary" shape="circle" icon={<EditOutlined />} />
          </Popover>
        </>
    }
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`http://localhost:5050/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`http://localhost:5050/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }
  return (
    <Table dataSource={dataSource} columns={columns} pagination={{
      pageSize: 10
    }} />
  )
}

export default RightList