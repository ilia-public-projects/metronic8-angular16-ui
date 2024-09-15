export class FormDataUtils{
    public static toFormData(formValue: any) {
        const formData = new FormData();
    
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            if (value) {
                formData.append(key, value);
            }
    
        }
    
        return formData;
    }
}