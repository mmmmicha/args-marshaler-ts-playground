class Args {
  private schema: Map<string, any>;
  private args: string[];
  private parsedArgs: Map<string, any>;

  constructor(schema: string, args: string[]) {
    this.schema = this.parseSchema(schema);
    this.args = args;
    this.parsedArgs = new Map<string, any>();
    this.parseArgs();
  }

  private parseSchema(schema: string): Map<string, any> {
    const map = new Map<string, any>();
    const elements = schema.split(',');
    elements.forEach((element) => {
      const trimmedElement = element.trim();
      if (trimmedElement.length > 0) {
        const key = trimmedElement[0];
        const type = trimmedElement.slice(1);
        map.set(key, type);
      }
    });
    return map;
  }

  private parseArgs(): void {
    let currentArgument: string | undefined;
    this.args.forEach((arg) => {
      if (arg.startsWith('-')) {
        currentArgument = arg.substring(1);
        if (!this.schema.has(currentArgument)) {
          throw new Error(`Argument -${currentArgument} not found in schema`);
        }
        const type = this.schema.get(currentArgument);
        if (type === '') {
          this.parsedArgs.set(currentArgument, true);
        }
      } else if (currentArgument) {
        const type = this.schema.get(currentArgument);
        if (type === '*') {
          this.parsedArgs.set(currentArgument, arg);
        } else if (type === '#') {
          this.parsedArgs.set(currentArgument, Number(arg));
        } else {
          throw new Error(`Unsupported type ${type}`);
        }
        currentArgument = undefined;
      }
    });
  }

  public getBoolean(arg: string): boolean {
    return this.parsedArgs.get(arg) ?? false;
  }

  public getString(arg: string): string {
    return this.parsedArgs.get(arg) ?? '';
  }

  public getNumber(arg: string): number {
    return this.parsedArgs.get(arg) ?? 0;
  }
}

// Usage example:
const schema = 'l,p*,d#';
const args = ['-l', '-p', '8080', '-d', '3.14'];
const parsedArgs = new Args(schema, args);

console.log(parsedArgs.getBoolean('l')); // true
console.log(parsedArgs.getString('p')); // '8080'
console.log(parsedArgs.getNumber('d')); // 3.14
