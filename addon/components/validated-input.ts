import { isArray } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { BufferedChangeset } from 'validated-changeset';

interface ValidatedInputArgs {
  id: string;
  name: string;
  label: string;
  value: string;
  valuePath: string;
  type: HTMLInputElement['type'];
  autocomplete: string;
  placeholder: string;
  changeset: BufferedChangeset;
  labelClass: string;
  inputClass: string;
  inputErrorClass: string;
  errorMessageClass: string;
  showErrorMessageOnInput: boolean;
  showErrorMessageOnBlur: boolean;
  onInput: (value: Event) => void;
  onBlur: (value: Event) => void;
  onChange: (value: Event) => void;
  onKeydown: (value: Event) => void;
  onKeyup: (value: Event) => void;
}

type ValidationErr = {
  key: string;
  value: string;
  validation: string;
};

type Error = {
  key: string;
  value: any;
  validation: ValidationErr[];
};

export default class ValidatedInput extends Component<ValidatedInputArgs> {
  @tracked isDirty = false;
  @tracked isBlurred = false;
  @tracked errors: Error[] = [];

  constructor(owner: any, args: ValidatedInputArgs) {
    super(owner, args);

    this.args.changeset.on('afterValidation', () => {
      this.errors = this.args.changeset.errors.filter(
        (error) => error.key === this.args.valuePath
      ) as unknown as Error[];
    });
  }

  @action
  handleOnInput() {
    this.isDirty = true;
  }

  @action
  handleOnBlur() {
    this.isBlurred = true;
  }

  get showErrorMessageOnInput() {
    return this.args.showErrorMessageOnInput && this.isDirty;
  }

  get showErrorMessageOnBlur() {
    return this.args.showErrorMessageOnInput && this.isBlurred;
  }

  get isValid() {
    return this.errors.length === 0;
  }

  get isInvalid() {
    return this.errors.length > 0;
  }

  get showErrorMessage() {
    return (
      (this.isInvalid && this.args.showErrorMessageOnBlur && this.isBlurred) ||
      (this.isInvalid && this.args.showErrorMessageOnInput && this.isDirty)
    );
  }

  get inputClass() {
    return this.isInvalid
      ? [this.args.inputClass, this.args.inputErrorClass].join(' ')
      : this.args.inputClass;
  }

  get errorMessage() {
    if (this.errors.length === 0) {
      return null;
    }
    console.log(this.errors[0]?.validation);

    return isArray(this.errors[0]?.validation)
      ? this.errors[0]?.validation[0]
      : this.errors[0]?.validation;
  }
}
