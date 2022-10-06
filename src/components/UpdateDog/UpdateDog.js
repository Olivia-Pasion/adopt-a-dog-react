
import { useParams } from 'react-router-dom';
import { useDogDetail } from '../../hooks/useDogDetail';
import UpdateForm from '../UpdateForm/UpdateForm';


export default function UpdateDog() {
  const { id } = useParams();
  const { loading, dogDetail } = useDogDetail(id);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="updatedog-form">
      <UpdateForm {...dogDetail}/>
    </div>
  );
}
