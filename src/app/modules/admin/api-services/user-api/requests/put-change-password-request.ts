export class PutChangePasswordRequest {
    constructor(
        public password: string,
        public confirmPassword: string
    ) { }
}
