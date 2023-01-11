import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'
import UserFrom from '../../../components/user-manage/UserFrom';

const { confirm } = Modal;

function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const addFrom = useRef(null)

  const showConfirm = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))

    axios.delete(`http://localhost:5050/users/${item.id}`)
  }

  useEffect(() => {
    axios.get('http://localhost:5050/regions').then(res => {
      const list = res.data
      setRegionList(list)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:5050/roles').then(res => {
      const list = res.data
      setRoleList(list)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:5050/users').then(res => {
      const list = res.data
      setDataSource([...list])
    })
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: region => <b>{region === "" ? '全球' : region}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: role => role?.roleName
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => <Switch disabled={item.default} checked={roleState}></Switch>
    },
    {
      title: '操作',
      render: (item) =>
        <>
          <Button disabled={item.default} onClick={() => showConfirm(item)} danger shape="circle" icon={<DeleteOutlined />} />
          <Button disabled={item.default} type="primary" shape="circle" icon={<EditOutlined />} />
        </>
    }
  ];

  const addFromOk = () => {
    addFrom.current.validateFields().then(value => {
      setIsAddVisible(false)
      addFrom.current.resetFields()
      axios.post('http://localhost:5050/users', {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList
            .filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Button type='primary' onClick={() => {
        setIsAddVisible(true)
      }}>添加用户</Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
      <Modal
        open={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(true)
        }}
        onOk={() => addFromOk()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={addFrom} />
      </Modal>
    </>
  )
}

export default UserList