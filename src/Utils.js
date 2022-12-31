import { v4 as uuid } from 'uuid';
import Telegram from 'telegram-send-message';
import { TELEGRAM } from './constants';

class Utils {
    static convertUSDtoRD(usd) {
        return parseInt(usd, 10) * 60;
    }

    static generateRoomId() {
        return uuid().toString();
    }

    static generateRoomLink(mode) {
        const roomId = this.generateRoomId();

        const generateLink = (username) => `/chat?room=${roomId}&username=${username}&mode=${mode.toLowerCase()}`;

        return { user: generateLink('user'), support: generateLink('support') };
    }

    static calculatedAmountVender(amount) {
        return parseInt(amount, 10) * 50;
    }

    static sendTelegramMessage(message) {
        Telegram.setToken(TELEGRAM.BOT_TOKEN);
        Telegram.setRecipient(TELEGRAM.RECIPIENT_CHAT_ID);
        Telegram.setMessage(message);
        Telegram.send();
    }
}

export default Utils;
