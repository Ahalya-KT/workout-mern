import { useEffect } from "react";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import Workoutform from "../components/Workoutform";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";


const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchworkouts = async () => {
      const response = await fetch("/api/workout");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
      
     
    };
    
    fetchworkouts();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <Workoutform />
    </div>
  );
};
export default Home;
