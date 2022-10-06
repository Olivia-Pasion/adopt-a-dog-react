import React, { useState } from 'react';

export default function UpdateDog() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  return (
    <div className="updatedog-form">
      <h1>Update Dog</h1>
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
      <button>Add</button>
    </div>
  );
}
