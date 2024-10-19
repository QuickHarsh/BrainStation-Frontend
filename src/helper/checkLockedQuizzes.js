import dayjs from "dayjs";

export const checkIfLocked = (quiz) => {
  const { status, current_step, learningSteps, updatedAt } = quiz;
  const updatedAtTime = dayjs(updatedAt);
  const currentTime = dayjs();

  // Only for "new" or "lapsed" quizzes
  if (status === "new" || status === "lapsed") {
    const currentLearningStepMinutes = learningSteps[current_step];
    const nextAvailableTime = updatedAtTime.add(currentLearningStepMinutes, "minute");

    // Lock the quiz if the current time is before the next available learning step time
    if (currentTime.isBefore(nextAvailableTime)) {
      return true; // isLocked = true
    }
  }
  return false; // isLocked = false
};
