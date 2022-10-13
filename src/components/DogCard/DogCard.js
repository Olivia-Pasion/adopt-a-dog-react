import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { deleteDog, getDogs } from '../../services/dogs';
import './DogCard.css';
export default function DogCard({ id, name, breed, bio, image, user_id, setDogs }) {
  const { user } = useContext(UserContext);
  //add delete button and edit button to return
  const owner = user.id === user_id;

  const handleAdopt = async () => {
    await deleteDog({ id });
    await setDogs(await getDogs());
  };

  return (
    <div className="dog-card">
      <img src={image}></img>
      <span>{`Hey there, I'm ${name}!`}</span>
      <span>{breed}</span>
      <p>{bio}</p>
      {owner && (
        <>
          <Link to={`/updatedog/${id}`}>Modify Info</Link>
          <button className="tooltip" aria-label="adopt-button" onClick={handleAdopt}>
            🏘️
            <span className="tooltiptext">Adopt Me!</span>
          </button>
        </>
      )}
    </div>
  );
}
