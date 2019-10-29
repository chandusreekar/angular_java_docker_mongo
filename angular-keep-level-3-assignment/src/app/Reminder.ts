export class Reminder {
    reminderId: String;
	reminderName: String;
	reminderDescription: String;
    reminderCreatedBy: String;

    constructor() {
        this.reminderId = '';
        this.reminderCreatedBy = '';
        this.reminderDescription = '';
        this.reminderName = '';
    }
}
