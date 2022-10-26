import Controller from '@ember/controller';
import EmployeeValidations from '../validations/employee';

import {
  BufferedChangeset,
  lookupValidator,
  Changeset,
} from 'validated-changeset';
import { tracked } from '@glimmer/tracking';
export default class Application extends Controller {
  EmployeeValidations = EmployeeValidations;
  @tracked declare changeset: BufferedChangeset;

  constructor() {
    super(...arguments);
    // anything else you need to do

    this.changeset = Changeset(
      {
        firstName: '',
        lastName: '',
      },
      lookupValidator(EmployeeValidations),
      EmployeeValidations
    );
  }
}
