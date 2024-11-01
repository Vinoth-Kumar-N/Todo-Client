import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import AuthServices from '../../services/authServices'
import { Button, Divider, Empty, Input, message, Modal, Select, Tag, Tooltip } from 'antd'
import { getUserdata } from '../../services/storageServices'
import ToDoServices from '../../services/todoServices'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { useNavigate } from 'react-router-dom'
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'



const ToDoList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [Updatedtitle, setUpdatedTitle] = useState('');
  const [UpdatedDescription, setUpdatedDescription] = useState('');
  const [UpdatedStatus, setUpdatedStatus] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});

  const [completeToDo, setcompleteToDo] = useState([]);
  const [incompleteToDo, setincompleteToDo] = useState([]);
  const [currentToDo, setcurrentToDo] = useState([]);

  const [CategoryType, setCategoryType] = useState('Incomplete');

  const [AllToDo, setAllToDo] = useState([]);

  const [filteredToDo, setfilteredToDo] = useState([]);

  const getAllToDo = async () => {
    let user = getUserdata();
    try {
      const response = await ToDoServices.getAllToDos(user && user.user ? user.user.id : null);
      console.log(response.data);
      setAllToDo(response.data);
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  }

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const UId = getUserdata().user.id
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: UId
      }
      console.log(data);
      const response = await ToDoServices.createTodo(data);
      console.log(response.data);
      setLoading(false);
      setIsAdding(false);
      message.success("Task Added Successfully");
      getAllToDo();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error(getErrorMessage(error));
    }
  }

  const getFormattedData = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  }

  const handleEdit = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  }

  const handleEditTask = async (id) => {
    try {
      setLoading(true);
      const data = {
        title: Updatedtitle,
        description: UpdatedDescription,
        isCompleted: UpdatedStatus
      }
      const response = await ToDoServices.updateToDo(currentEditItem?._id, data);
      console.log(response.data);
      message.success(`${currentEditItem?.title} Task Updated Successfully`);
      setLoading(false);
      getAllToDo();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      message.error(getErrorMessage(error));
    }
  }

  const handleDelete = async (item) => {
    try {
      const response = await ToDoServices.deleteToDo(item?._id);
      console.log(response.data);
      message.success(`${item?.title} is Successfully Deleted`);
      getAllToDo();
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await ToDoServices.updateToDo(id, { isCompleted: status });
      if (status) {
        message.success("Hurrey! A Task is Completed");
        getAllToDo();
      } else {
        message.error("Task is marked as Incomplete");
        getAllToDo();
      }
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  }

  const handleCategoryTypeChange = (value) => {
    console.log(value);
    setCategoryType(value);
  }

  useEffect(() => {
    let user = getUserdata();
    const getAllToDo = async () => {
      try {
        const response = await ToDoServices.getAllToDos(user && user.user ? user.user.id : null);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }
    if (user && user ? user.user : null) {
      getAllToDo();
    } else {
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    const completeToDo = AllToDo.filter((data) => data?.isCompleted === true);
    const incompleteToDo = AllToDo.filter((data) => data?.isCompleted === false);

    if (CategoryType === 'completed') {
      setcurrentToDo(completeToDo);
    } else if (CategoryType === 'all') {
      setcurrentToDo(AllToDo);
    } else {
      setcurrentToDo(incompleteToDo);
    }
  }, [AllToDo, CategoryType]);


  const handleSearch = (e) => {
    let query = e.target.value;
    let filteredToDo = currentToDo.filter((item) => item.title.toLowerCase().match(query.toLowerCase()));
    console.log(filteredToDo);
    if (filteredToDo.length > 0 && query) {
      setfilteredToDo(filteredToDo);
    }
  }

  return (
    <>
      <Navbar />
      {
        AuthServices.isAuthenticated() ?
          <section className="w-[100vw] h-[100vh] flex-col justify-center items-center">

            <div className="w-auto h-auto  mt-10 mx-10 pt-20 flex justify-between">
              <h2 className="text-2xl">Your Tasks</h2>
              <Input className=" h-12 w-[58rem]" onChange={handleSearch} placeholder="Search Your Task By Title Here..." />
              <div className="">
                <Button onClick={() => setIsAdding(true)} type='primary' className='h-[3rem] w-[8rem]' >Add Task</Button>
                <Select onChange={(value) => handleCategoryTypeChange(value)} value={CategoryType} style={{ width: 130, height: 50, margin: '10px' }} options={[
                  {
                    value: 'all',
                    label: 'All'
                  },
                  {
                    value: 'completed',
                    label: 'Completed'
                  },
                  {
                    value: 'incompleted',
                    label: 'Incompleted'
                  }
                ]}
                />
              </div>
            </div>

            <div className="h-auto w-[90vw] mx-10 my-5 flex flex-wrap">
              {
                filteredToDo.length > 0 ? filteredToDo.map((data, index) => {
                  return (
                    <div key={data?._id} className="w-[25rem] h-[20rem] bg-slate-100 m-4 p-2 shadow-xl rounded-xl">

                      <div className="CardHeader flex justify-between">
                        <h1 className="">{data?.title}</h1>
                        {data?.isCompleted ? <Tag color='cyan'>Completed</Tag> : <Tag color='red'>InComplete</Tag>}
                      </div>
                      <p className="">{data?.description}</p>

                      <div className="cardFooter flex justify-between">
                        <Tag>{getFormattedData(data?.createdAt)}</Tag>
                        <div className="flex gap-4">
                          <Tooltip title='Edit Task?'><EditOutlined onClick={() => handleEdit(data)} className=''></EditOutlined></Tooltip>
                          <Tooltip title='Delete Task?'><DeleteOutlined onClick={() => handleDelete(data)} className=''></DeleteOutlined></Tooltip>
                          {data?.isCompleted ? <Tooltip title='Mark as Incomplete'><CheckCircleFilled onClick={() => handleUpdateStatus(data?._id, false)} className=''></CheckCircleFilled></Tooltip> :
                            <Tooltip title='Mark as Complete'><CheckCircleOutlined onClick={() => handleUpdateStatus(data?._id, true)} className=''></CheckCircleOutlined></Tooltip>}
                        </div>
                      </div>
                    </div>
                  )
                }) : currentToDo.length > 0 ? currentToDo.map((data, index) => {
                  return (
                    <div key={data?._id} className="w-[25rem] h-fit overflow-hidden bg-slate-100 m-4 p-2 shadow-xl rounded-xl">

                      <div className="CardHeader flex justify-between">
                        <h1 className="">{data?.title}</h1>
                        {data?.isCompleted ? <Tag color='cyan'>Completed</Tag> : <Tag color='red'>InComplete</Tag>}
                      </div>
                      <p className="">{data?.description}</p>

                      <div className="cardFooter flex justify-between">
                        <Tag>{getFormattedData(data?.createdAt)}</Tag>
                        <div className="flex gap-4">
                          <Tooltip title='Edit Task?'><EditOutlined onClick={() => handleEdit(data)} className=''></EditOutlined></Tooltip>
                          <Tooltip title='Delete Task?'><DeleteOutlined onClick={() => handleDelete(data)} className=''></DeleteOutlined></Tooltip>
                          {data?.isCompleted ? <Tooltip title='Mark as Incomplete'><CheckCircleFilled onClick={() => handleUpdateStatus(data?._id, false)} className=''></CheckCircleFilled></Tooltip> :
                            <Tooltip title='Mark as Complete'><CheckCircleOutlined onClick={() => handleUpdateStatus(data?._id, true)} className=''></CheckCircleOutlined></Tooltip>}
                        </div>
                      </div>
                    </div>
                  )
                }) :
                  <div className="">
                    <Empty />
                  </div>
              }
            </div>





            <Divider />
            <Modal confirmLoading={loading} title='Add New To Do Task' open={isAdding} onOk={handleSubmitTask} onCancel={() => setIsAdding(false)} >
              <Input style={{ marginBottom: '1rem' }} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input.TextArea placeholder='Descreption' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Modal>

            <Modal confirmLoading={loading} title={`Update ${currentEditItem.title}`} open={isEditing} onOk={handleEditTask} onCancel={() => setIsEditing(false)} >
              <Input style={{ marginBottom: '1rem' }} placeholder='Updated Title' value={Updatedtitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
              <Input.TextArea placeholder='Updated Descreption' value={UpdatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
              <Select onChange={(value) => setUpdatedStatus(value)} value={UpdatedStatus}
                options={[
                  {
                    value: false,
                    label: 'Incompleted'
                  },
                  {
                    value: true,
                    label: 'Completed'
                  }
                ]}
              />
            </Modal>
          </section> : null
      }

    </>
  )
}

export default ToDoList