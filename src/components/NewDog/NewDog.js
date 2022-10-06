import { useState } from 'react';
import { addNewDog } from '../../services/dogs';


export default function NewDog() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  const handleAddNewDog = async () => {
    const NewDog = {
      name,
      breed,
      bio,
      image,
    };
    await addNewDog(NewDog);
      //setNewDog((prev) => [...prev, { NewDog }]);
      
  };
  

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)}>Name:</input>
      <input value={breed} onChange={(e) => setBreed(e.target.value)}>Breed:</input>
      <input value={bio} onChange={(e) => setBio(e.target.value)}>Bio:</input>
      <input value={image} onChange={(e) => setImage(e.target.value)}>Image URL:</input>
      <button onClick={handleAddNewDog}>Add</button>
    </div>
  );
}
