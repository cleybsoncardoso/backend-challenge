import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customGoal', async: false })
export class CustomGoalDate implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    try {
      const [monthRaw, yearRaw] = text.split('/');
      const month = parseInt(monthRaw);
      const year = parseInt(yearRaw);
      return month >= 1 && month <= 12 && year >= 2022 && year < 3000;
    } catch (err) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'The goal value ($value) is not referencing a month or it is not a future date';
  }
}
