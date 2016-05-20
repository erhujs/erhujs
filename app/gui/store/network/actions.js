/**
 * request actions
 *
 * @param
 */


export const addNet = makeAction('ADD_NETWORK')
export const deleteNet = makeAction('DELETE_NETWORK')
export const toggleNet = makeAction('TOGGLE_NETWORK')
export const editNet = makeAction('EDIT_NETWORK')
export const toggleAll = makeAction('TOGGLE_ALL')
export const clearCompleted = makeAction('CLEAR_COMPLETED')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
