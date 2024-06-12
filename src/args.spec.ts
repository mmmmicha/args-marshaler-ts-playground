import { Args } from './args';

describe('Args class failure cases', () => {
  test('should throw error for unknown argument', () => {
    const schema = 'l,p*,d#';
    const args = ['-x', 'someValue'];

    expect(() => {
      new Args(schema, args);
    }).toThrow('Argument -x not found in schema');
  });

  test('should throw error for unsupported type', () => {
    const schema = 'l,p*,d#,f##';
    const args = ['-f', '3.14'];

    expect(() => {
      new Args(schema, args);
    }).toThrow('Unsupported type ##');
  });

  test('should throw error for missing value for string type', () => {
    const schema = 'l,p*,d#';
    const args = ['-p'];

    expect(() => {
      new Args(schema, args);
    }).toThrow('Argument -p not found in schema');
  });

  test('should throw error for missing value for number type', () => {
    const schema = 'l,p*,d#';
    const args = ['-d'];

    expect(() => {
      new Args(schema, args);
    }).toThrow('Argument -d not found in schema');
  });

  test('should throw error for non-numeric value for number type', () => {
    const schema = 'l,p*,d#';
    const args = ['-d', 'notANumber'];

    expect(() => {
      new Args(schema, args);
    }).toThrow();
  });
});