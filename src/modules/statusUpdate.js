const handleStatusUpdate = (e, index) => {
  const isChecked = e.target.toggleAttribute('checked');
  const taskLists = JSON.parse(localStorage.getItem('duties'));
  taskLists[index].completed = isChecked;
  localStorage.setItem('duties', JSON.stringify(taskLists));
  window.location.reload();
};

export default handleStatusUpdate;