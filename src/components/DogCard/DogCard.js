

export default function DogCard({ name, breed, bio, image }) {

  //add delete button and edit button to return
  return (
    <div>
      <img>{image}</img>
      <span>{`Hi! My name is ${name}`}</span>
      <span>{breed}</span>
      <p>{bio}</p>
    </div>
  );
}
