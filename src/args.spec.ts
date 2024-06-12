import { Args } from './args';

describe('Args class failure cases', () => {
  test('should throw error for unknown argument', () => {
    // given
    const schema = 'l:boolean,p:string,d:number';
    const args = ['-x', 'someValue'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Argument -x not found in schema');
  });

  test('should throw error for unsupported type', () => {
    // given
    const schema = 'l:boolean,p:string,d:number,f:float';
    const args = ['-f', '3.14'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Unsupported type float');
  });

  test('should throw error for missing value for string type', () => {
    // given
    const schema = 'l:boolean,d:number';
    const args = ['-p'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Argument -p not found in schema');
  });

  test('should throw error for non-numeric value for number type', () => {
    // given
    const schema = 'l:boolean,p:string,d:number';
    const args = ['-d', 'notANumber'];

    // when
    const result = new Args(schema, args).getNumber('d');

    // then
    expect(result).toBeNaN();
  });
});
