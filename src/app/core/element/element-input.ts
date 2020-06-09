import { ElementBase } from './element-base';
import {ElementBase} from './element-base';

export class ElementInput extends ElementBase<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options.type || '';
  }
}
