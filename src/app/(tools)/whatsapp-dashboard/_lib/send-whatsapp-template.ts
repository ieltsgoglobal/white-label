import twilio from "twilio";

export class WhatsappTemplateUserJourneyClass {
    private client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    private readonly number = "whatsapp:+15559638025"

    /**
     * Sent shortly after a user logs into IELTSGoGlobal but has not yet
     * started practicing.
     *
     * Purpose:
     * - Welcome the user back.
     * - Help them discover available practice resources.
     * - Encourage them to begin their first practice session.
     *
     * This is intended to improve activation by converting newly registered
     * users into active learners.
    */
    async sendPracticeReminder(phone: string) {
        return this.client.messages.create({
            from: this.number,
            to: `whatsapp:${phone}`,
            contentSid: "HXa57ad962d8a77caabd3ccd2b101bc3bd",
            contentVariables: "{}",
        });
    }
}

export const WhatsappTemplateUserJourney = new WhatsappTemplateUserJourneyClass();