/**
 * Find and load messages module on consuming app. Defaults to addon messages.
 * To define a custom message map, create `my-app/app/validations/messages.js`
 * and export an object.
 *
 * @param  {Object} moduleMap
 * @param  {Boolean} useCache Pass `false` to ignore cached key
 * @return {Object}
 */
export default function getMessages(moduleMap?: any, useCache?: boolean): any;
