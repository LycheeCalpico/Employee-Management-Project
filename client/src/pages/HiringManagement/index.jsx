import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, message, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createTokenThunk } from "../../thunks/token-thunk";
import Navbar from "../../components/Navbar";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const data = [
  {
    key: "1",
    name: "abc",
    email: "abc@gmail.com",
  },
  {
    key: "2",
    name: "Alice",
    email: "alice@gmail.com",
  },
  {
    key: "3",
    name: "Bob",
    email: "bob@gmail.com",
  },
  {
    key: "4",
    name: "CC",
    email: "cc@gmail.com",
  },
];

export default function HiringManagement() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const onRowClick = (record) => {
    setSelectedRowKey(record.key);
    setSelectedEmail(record.email);
    setSelectedName(record.name);
  };

  console.log("user role", user.isHR);
  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRowKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]);
      setSelectedEmail(selectedRows[0]?.email || "");
      setSelectedName(selectedRows[0]?.name || "");
    },
  };

  const handleSendToken = () => {
    dispatch(createTokenThunk({ email: selectedEmail, name: selectedName }));
    console.log("create token success for ", selectedName);
    messageApi.open({
      type: "success",
      content: "Token created and sent",
      duration: 2,
    });
  };



  return (
    <div>
      {contextHolder}
      <Navbar />
      <br />
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },

          {
            title: <a href="hiring-management/token"> Token History</a>,
          },
       
          {
            title:(
              <>
             <UserOutlined />
            <a href="/hiring-management/applications"> Application Management</a>
            </>
            )
          }
        ]}
      />
      <br />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            onRowClick(record);
          },
        })}
        pagination={false}
      />
      <br />
      <Button onClick={handleSendToken}>Generate token and send email</Button>
 
    </div>
  );
}
