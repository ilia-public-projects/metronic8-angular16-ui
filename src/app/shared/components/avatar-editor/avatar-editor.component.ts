import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-avatar-editor',
    templateUrl: './avatar-editor.component.html'
})
export class AvatarEditorComponent implements OnChanges {
    @Input() isSaving = false;
    @Input() public photoUri?: string | null;
    @Output() public photoChanged: EventEmitter<File> = new EventEmitter<File>();

    public avatarUri!:string;
    private blankAvatarUri = '/assets/media/avatars/blank.png';

    constructor() { 
        this.avatarUri = this.blankAvatarUri;
    }

    ngOnChanges(changes: SimpleChanges): void { 
        // If the photoUri changes and is set, update the avatarUri
        if (changes.photoUri && changes.photoUri.currentValue && changes.photoUri.currentValue !== this.avatarUri) {
            this.avatarUri = changes.photoUri.currentValue;
        }
    }

    public removeAvatar() {
        this.avatarUri = this.blankAvatarUri;
        this.photoChanged.emit();
    }

    public onSelectFile(event: any) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files[0]) {
            const file = inputElement.files[0];
            this.avatarUri = URL.createObjectURL(file);
            this.photoChanged.emit(file);
        }
    }
}