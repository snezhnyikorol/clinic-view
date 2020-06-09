import { ElementBase } from './element-base';

export class ElementSelect extends ElementBase<string> {
  controlType = 'select';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
