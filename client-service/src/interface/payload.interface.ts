export interface payload {
    id: number,
    mail: string,
    user_type: Role
}

enum Role {
    LANDLORD,
    ADMIN
  }