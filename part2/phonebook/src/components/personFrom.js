const PersonForm = ({
  addNumber,
  newName,
  handleChangeName,
  newNumber,
  handleChangeNumber,
}) => (
  <form onSubmit={addNumber}>
    <div>
      name: <input value={newName} onChange={handleChangeName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
