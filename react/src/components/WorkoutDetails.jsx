import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { MdDelete } from "react-icons/md";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

 const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workout/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.loads}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      {/* to get hrs */}
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
      <MdDelete  size={25} onClick={handleClick} />
      <p>Date : {currDate}</p>
      <p>Time : {currTime}</p>
    </div>
  );
};

export default WorkoutDetails;
