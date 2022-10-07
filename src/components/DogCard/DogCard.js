import { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { deleteDog } from '../../services/dogs';
import './DogCard.css';
export default function DogCard({ id, name, breed, bio, image, user_id }) {
  const { user } = useContext(UserContext);
  //add delete button and edit button to return
  const owner = user.id === user_id;

  const handleAdopt = async () => {
    await deleteDog({ id });
  };

  return (
    <div className="dog-card">
      <img src={image}></img>
      <span>{`Hi! My name is ${name}`}</span>
      <span>{breed}</span>
      <p>{bio}</p>
      {owner && (
        <>
          <Link to={`/updatedog/${id}`}>Edit</Link>
          <button onClick={handleAdopt}>🏘️</button>
        </>
      )}
    </div>
  );
}
