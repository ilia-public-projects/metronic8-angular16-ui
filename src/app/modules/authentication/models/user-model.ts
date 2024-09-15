export class UserModel {
    constructor(
        public userId: string,
        public email: string,
        public name: string,
        public roles: string[],
        public issuedAt: number,
        public expiresAt: number,
        public photoUri?: string
    ) {

    }

    get tokenExpired() {
        if (!this.expiresAt || this.expiresAt <= new Date().getTime() / 1000) {
            return true;
        }

        return false;
    }

    get tokenDuration() {
        if (this.tokenExpired) {
            return 0;
        } else {
            const remaining = (this.expiresAt * 1000) - new Date().getTime();
            return remaining;
        }
    }
}
