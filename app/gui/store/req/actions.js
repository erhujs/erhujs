/**
 * request actions
 *
 * @param
 */


export const addReq = makeAction('ADD_REQUEST')
export const deleteReq = makeAction('DELETE_REQUEST')
export const toggleReq = makeAction('TOGGLE_REQUEST')
export const editReq = makeAction('EDIT_REQUEST')
export const toggleAll = makeAction('TOGGLE_ALL')
export const clearCompleted = makeAction('CLEAR_COMPLETED')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
