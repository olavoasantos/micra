export class ValidationError<T = any> extends Error {
  public status = 422;
  public fields: (keyof T)[];
  public errors: Record<keyof T, string[]>;
  get message() {
    return JSON.stringify(
      this.fields.reduce((message, field: keyof T) => {
        if (this.has(field as keyof T)) {
          message[field] = this.errors[field];
        }
        return message;
      }, {} as Partial<Record<keyof T, string[]>>),
    );
  }

  constructor(fields: (keyof T)[]) {
    super();
    this.fields = fields;
    this.errors = fields.reduce((errors, field) => {
      errors[field] = [];

      return errors;
    }, {} as Partial<Record<keyof T, string[]>>) as Record<keyof T, string[]>;
  }

  has(field: keyof T) {
    if (field && this.errors[field]) {
      return this.errors[field].length > 0;
    }
  }

  hasAny() {
    return Object.keys(this.errors).some((inputField) => this.has(inputField as keyof T));
  }

  set(field: keyof T, message: string) {
    if (this.errors[field]) {
      this.errors[field].push(message);
    }
  }
}
