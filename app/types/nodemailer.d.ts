declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: { user: string; pass: string }
  }

  export interface SentMessageInfo {
    messageId?: string
  }

  export interface Transporter {
    sendMail(options: { from?: string; to: string | string[]; subject: string; html?: string; text?: string }): Promise<SentMessageInfo>
  }

  export function createTransport(options: TransportOptions): Transporter
}
