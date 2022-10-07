import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useDogs } from '../../hooks/useDogs';
import DogCard from '../DogCard/DogCard';
import './Dogs.css';

export default function Dogs() {
  const { dogs, setDogs } = useDogs();
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-up"></Redirect>;
  }

  return (
    <div>
      <h1>Welcome to the Puppy Party!</h1>
      <div className="dog-container">
        {dogs.map((dog) => (
          <DogCard key={dog.id} {...dog} setDogs={setDogs} />
        ))}
      </div>
    </div>
  );
}
