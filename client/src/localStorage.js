export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

export function loadState(state) {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
}
