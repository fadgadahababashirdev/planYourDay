import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'react-toastify';

const Dos = () => {
  const [rTime, setRTime] = useState(null);
  const [task, setTask] = useState('');
  const [numberSta, setNumberSta] = useState(null);
  const [usernameStorage, setUserName] = useState(() => {
    const value = localStorage.getItem('username');
    if (value) {
      return value;
    } else {
      return '';
    }
  });
  console.log('The username from local storage is ', usernameStorage);
  const [dos, setDos] = useState(() => {
    const datas = localStorage.getItem('tasks');
    if (datas) {
      return JSON.parse(datas);
    } else {
      return [];
    }
  });

  useEffect(() => {
    const handleData = () => {
      const count = dos.filter((data) => !data.completed);
      const falseNumber = count.length;
      setNumberSta(falseNumber);
    };
    handleData();
  }, []);

  const number = dos.length;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newTodos = await [
        ...dos,
        { id: crypto.randomUUID(), title: task, completed: false },
      ];
      toast.success('New task has been created !');
      setDos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  //   store data on the local storage

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(dos));
  });

  const handleDelete = (id) => {
    const newData = dos.filter((task) => task.id !== id);
    setDos(newData);
  };

  const handleCheck = (id) => {
    setDos((prevDos) => {
      return prevDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  console.log('Our dos', dos);
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  console.log(task);
  useEffect(() => {
    const handleCurrentTime = new Date();
    const hours = handleCurrentTime.getHours();
    const minutes = handleCurrentTime.getMinutes();
    hours >= 0 && hours > 12
      ? setRTime(`${hours}:${minutes} Pm`)
      : setRTime(`${hours}:${minutes} Am`);
  }, []);

  console.log('The number of false action is ', numberSta);

  return (
    <div className="w-screen h-screen px-2 md:flex justify-center items-center">
      <div className="">
        {/* time */}
        <h1 className="text-white text-4xl mt-5">{rTime}</h1>
        <div className="mt-5">
          <h1 className="text-white text-4xl font-medium">
            Great day to start your goals, {usernameStorage}
          </h1>
        </div>
        {/* input */}
        <div className="flex mt-12">
          {' '}
          <input
            type="text"
            placeholder="What do you need to do?"
            className=" pl-auto w-80 py-1 px-2 m rounded-md text-black outline-none "
            onChange={(e) => handleChange(e)}
          />
          <IoMdAdd
            className="text-white mx-2 font-extrabold bg-blue-500 md:flex ml-auto"
            size={32}
            onClick={(e) => handleSubmit(e)}
          />
        </div>

        <p className="mt-2">
          You have
          {numberSta <= 0
            ? ' nothing '
            : `  ${numberSta} ${numberSta === 1 ? 'Thing' : 'Things '} `}
          todo
        </p>

        {dos.map((singleDo) => {
          return (
            <div
              className="flex w-full justify-around items-center mt-3 bg-green-300 py-2 px-1"
              key={singleDo.id}
            >
              <input
                type="checkbox"
                className="text-2xl"
                style={{ width: '22px', height: '22px' }}
                onClick={() => handleCheck(singleDo.id)}
                value={singleDo.completed}
              />
              <h1 className="text-2xl">
                {singleDo.completed === true ? (
                  <strike className="text-black">{singleDo.title}</strike>
                ) : (
                  singleDo.title
                )}
              </h1>
              <h1>
                <MdDelete size={30} onClick={() => handleDelete(singleDo.id)} />
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dos;
