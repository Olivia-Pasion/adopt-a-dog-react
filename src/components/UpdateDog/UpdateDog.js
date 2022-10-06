import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDogDetail } from '../../hooks/useDogDetail';
import { updateDog } from '../../services/dogs';

export default function UpdateDog() {
  const { id } = useParams();

  const { dogDetail } = useDogDetail(id);

  const [name, setName] = useState(dogDetail.name);
  const [breed, setBreed] = useState(dogDetail.breed);
  const [bio, setBio] = useState(dogDetail.bio);
  const [image, setImage] = useState(dogDetail.image);

  const handleSubmit = () => {
    const updatedDog = {
      id,
      name,
      breed,
      bio,
      image,
    };

    updateDog(updatedDog);
  };

  return (
    <div className="updatedog-form">
      <h1>Update Dog</h1>
      <label>
        Name:
        <input
          value={name}
          placeholder={dogDetail.name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Breed:
        <input
          value={breed}
          placeholder={dogDetail.breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <input value={bio} placeholder={dogDetail.bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input
          value={image}
          placeholder={dogDetail.image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
