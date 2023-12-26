import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts:[action.payload,...state.workouts]
      };
      default:
        return state
  }
};

export const WorkoutContextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });
};

dispatch({ type: "SET_WORKOUTS", payload: [{}, {}] });

const WorkoutContext = () => {
  return (
    <WorkoutContext.Provider value={{...state,dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
