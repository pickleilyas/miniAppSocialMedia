export const selectorUsers = (state) => state.user.users
export const selectorUsersById = (state,id) => state.user.users.find(i => i.id === id)