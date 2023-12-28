const Workout = require("../models/workoutmodel");
const mongoose = require("mongoose");

// get all workout
const getWorkouts = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};
//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, loads, reps } = req.body;
  // add doc to db
   
  // error handling
  let emptyFields =[]
   if(!title){
    emptyFields.push('title')
   }
   if(!loads){
    emptyFields.push('loads')
   }
   if(!reps){
    emptyFields.push('reps')
   }
   if(emptyFields.length>0){
    return res.status(400).json({error:'please fill in all the fields',emptyFields})
   }


  try {
    const workout = await Workout.create({ title, loads, reps });
    res.status(200).json(workout);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
