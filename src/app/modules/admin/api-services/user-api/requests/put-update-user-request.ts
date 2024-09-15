export class PutUpdateUserRequest {
    constructor(
        public email: string,
        public name: string,
        public isActive: boolean,
    ) {

    }
}
