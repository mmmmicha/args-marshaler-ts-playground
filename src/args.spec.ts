import { Args } from './args';

describe('Args class failure cases', () => {
  it('should throw error for unknown argument', () => {
    // given
    const schema = 'l:boolean,p:string,d:number';
    const args = ['-x', 'someValue'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Argument -x not found in schema');
  });

  it('should throw error for unsupported type', () => {
    // given
    const schema = 'l:boolean,p:string,d:number,f:float';
    const args = ['-f', '3.14'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Unsupported type float');
  });

  it('should throw error for missing value for string type', () => {
    // given
    const schema = 'l:boolean,d:number';
    const args = ['-p'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Argument -p not found in schema');
  });

  it('should throw error for non-numeric value for number type', () => {
    // given
    const schema = 'l:boolean,p:string,d:number';
    const args = ['-d', 'notANumber'];

    // when
    const result = new Args(schema, args).getNumber('d');

    // then
    expect(result).toBeNaN();
  });

  it('should throw error for undefined invalid type', () => {
    // given
    const schema = 'l::boolean';
    const args = ['-l'];

    // when
    const result = () => new Args(schema, args);

    // then
    expect(result).toThrow('Invalid type :boolean');
  });
});
