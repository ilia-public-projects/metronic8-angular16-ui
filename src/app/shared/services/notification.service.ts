import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ApiResult } from "../shared-api-models/api-result";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private toastr: ToastrService) { }

    public success(message: string) {
        this.toastr.success(message, 'Success');
    }

    public error(message: string, error?: any) {
        this.toastr.error(message, 'Error');
        if (error) {
            console.error(error);
        }
    }

    public apiError(error: any): string[] {
        const response = error.error as ApiResult<string>;
        this.toastr.error(response.response, 'Error');
        return response.errorMessages;
    }
}
