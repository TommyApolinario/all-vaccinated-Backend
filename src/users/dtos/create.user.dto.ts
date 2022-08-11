export interface CreateUserDTO {
  readonly identification: string;
  readonly password: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly birthday: string;
  readonly phoneNumber?: string;
}
