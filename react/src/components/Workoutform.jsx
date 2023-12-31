import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const Workoutform = () => {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [loads, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const[emptyFields,setEmptyfields]=useState([])
  
  const handleSubmit = async (e) => {
      e.preventDefault()

    const workout = { title, loads, reps };

    const response = await fetch("http://localhost:4000/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setError(json.error);
      setEmptyfields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "WORKOUT_CREATED", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title')?'error':''}
      />

      <label>Load (in Kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={loads}
        className={emptyFields.includes('loads')?'error':''}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps')?'error':''}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}

    
    </form>
  );
};

export default Workoutform;
