import {client} from '../api/client';
class EmailManager {
  static async sendWelcome({
    firstName,
    email,
  }: {
    firstName: string;
    email: string;
  }) {
    return client.post('/email/welcome', {firstName, email});
  }
}

export default EmailManager;
