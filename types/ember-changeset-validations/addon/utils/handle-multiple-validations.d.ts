/**
 * Handles an array of validators and returns Promise.all if any value is a
 * Promise.
 *
 * @public
 * @param  {Array} validators Array of validator functions
 * @param  {String} options.key
 * @param  {Any} options.newValue
 * @param  {Any} options.oldValue
 * @param  {Object} options.changes
 * @param  {Object} options.content
 * @return {Promise|Boolean|Any}
 */
export default function handleMultipleValidations(validators: any[], { key, newValue, oldValue, changes, content }: string): Promise<any> | boolean | Any;
