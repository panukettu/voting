export const vote = entry => ({ type: "VOTE", entry, meta: { remote: true } });
export const setState = state => ({ type: "SET_STATE", state });
export const next = () => ({ type: "NEXT", meta: { remote: true } });
