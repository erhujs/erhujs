/**
 * setting actions
 *
 * 
 */

export const togglerBar = makeAction('TOGGLER_BAR')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
