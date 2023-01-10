import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Tree } from 'antd'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal

function RoleList() {

  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentID] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5050/roles/${item.id}`)
  }

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      render: (item) =>
        <>
          <Button onClick={() => showConfirm(item)} danger shape="circle" icon={<DeleteOutlined />} />
          <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} onClick={() => {
            setIsModalOpen(true)
            setCurrentRights(item.rights)
            setCurrentID(item.id)
          }} />
        </>
    }
  ]

  useEffect(() => {
    axios.get('http://localhost:5050/roles').then(res => {
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5050/rights?_embed=children').then(res => {
      setRightList(res.data)
    })
  }, [])

  const handleOk = () => {
    console.log(currentRights);
    setIsModalOpen(false)
    // 同步datasource
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRights
        }
      }
      return item
    }))
    // patch
    axios.patch(`http://localhost:5050/roles/${currentId}`, {
      rights: currentRights
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked)
  }
  return (
    <div>
      <Table rowKey={item => item.id} dataSource={dataSource} columns={column}>

      </Table>
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRights}
          treeData={rightList}
          onCheck={onCheck}
          checkStrictly
        />
      </Modal>
    </div>
  )
}

export default RoleList