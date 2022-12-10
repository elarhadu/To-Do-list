/* eslint-disable no-unused-vars */
const clearAll = (e) => {
  const taskLists = JSON.parse(localStorage.getItem('duties'));
  const updatedLists = taskLists.filter((task) => !task.completed);
  updatedLists.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('duties', JSON.stringify(updatedLists));
};

export default clearAll;