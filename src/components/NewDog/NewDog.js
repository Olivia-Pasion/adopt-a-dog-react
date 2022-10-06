import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { addNewDog } from '../../services/dogs';
import './NewDog.css';

export default function NewDog() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleAddNewDog = async () => {
    const NewDog = {
      user_id: user.id,
      name,
      breed,
      bio,
      image,
    };
    await addNewDog(NewDog);
    history.push('/');
  };

  return (
    <div className="newdog-form">
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Breed:
        <input value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Bio:
        <input value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <button onClick={handleAddNewDog}>Add</button>
    </div>
  );
}
