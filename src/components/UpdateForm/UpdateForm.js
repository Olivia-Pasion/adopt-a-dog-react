import { updateDog } from '../../services/dogs';
import React, { useState } from 'react';

export default function UpdateForm({ id, name, breed, bio, image }) {
  const [nameDet, setNameDet] = useState(name);
  const [breedDet, setBreedDet] = useState(breed);
  const [bioDet, setBioDet] = useState(bio);
  const [imageDet, setImageDet] = useState(image);

  const handleSubmit = async () => {
    const updatedDog = {
      id,
      name: nameDet,
      breed: breedDet,
      bio: bioDet,
      image: imageDet,
    };

    await updateDog(updatedDog);
  };

  return (
    <div>
      <h1>Update Dog</h1>
      <label htmlFor="name">
        Name:
        <input id="name" value={nameDet} onChange={(e) => setNameDet(e.target.value)} />
      </label>
      <label htmlFor="breed">
        Breed:
        <input id="breed" value={breedDet} onChange={(e) => setBreedDet(e.target.value)} />
      </label>
      <label htmlFor="bio">
        Bio:
        <input id="bio" value={bioDet} onChange={(e) => setBioDet(e.target.value)} />
      </label>
      <label htmlFor="image-url">
        Image URL:
        <input id="image-url" value={imageDet} onChange={(e) => setImageDet(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
