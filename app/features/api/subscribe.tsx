import 'dotenv/config'

import { createTransport } from 'nodemailer'
import { data } from 'react-router'

import type { ActionFunctionArgs } from 'react-router'

const SUBSCRIBE_HTML = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
  <style type="text/css">
    table { border-collapse: collapse; }
    body, #wrapper { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#E0E0E0;min-width:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#E0E0E0;">
    <tr>
      <td align="center" style="padding:50px 10px 31px 10px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:600px;margin-left:auto;margin-right:auto;">
          <tr>
            <td style="background-color:#586CE0;padding:49px 50px 42px 50px;border-radius:18px 18px 0 0;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:24px;font-weight:800;line-height:1.3;color:#FFFFFF;letter-spacing:-0.5px;">VALUE UP PARTNERS</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#F8F8F8;padding:40px 50px 40px 50px;border-radius:0 0 18px 18px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <h1 style="margin:0 0 20px 0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:30px;font-weight:800;line-height:41px;letter-spacing:-1.56px;color:#191919;">구독 신청이 완료되었습니다.</h1>
                    <p style="margin:0 0 15px 0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:14px;font-weight:500;line-height:22px;letter-spacing:-0.56px;color:#333333;">안녕하세요. VALUE UP PARTNERS 구독 신청이 정상적으로 완료되었습니다.</p>
                    <p style="margin:0 0 15px 0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:14px;font-weight:500;line-height:22px;letter-spacing:-0.56px;color:#333333;">새 소식이 있을 때마다 이메일로 안내해 드리겠습니다.</p>
                    <p style="margin:25px 0 0 0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:14px;font-weight:500;line-height:22px;letter-spacing:-0.56px;color:#333333;">문의 사항이 있으시면 이 메일에 회신해 주세요.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 50px 50px 50px;">
              <p style="margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:12px;font-weight:500;line-height:22px;color:#888888;text-align:center;">© VALUE UP PARTNERS. All Rights Reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const formData = await request.formData()
    const email = formData.get('email') as string | null

    if (!email || !email.trim()) {
      return data({ error: '이메일을 입력해주세요.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return data({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 })
    }

    const trimmedEmail = email.trim()

    const smtpHost = (process.env.SMTP_HOST ?? 'smtp.naver.com').trim()
    const smtpPort = Number(process.env.SMTP_PORT ?? 587)
    const smtpUser = (process.env.SMTP_USER ?? '').trim()
    const smtpPass = (process.env.SMTP_PASS ?? '').trim()
    const smtpFromName = (process.env.SMTP_FROM_NAME ?? '').trim()
    const fromAddress = smtpUser

    if (smtpUser && smtpPass) {
      try {
        const transporter = createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        const from = smtpFromName ? `"${smtpFromName}" <${fromAddress}>` : fromAddress

        await transporter.sendMail({
          from,
          to: trimmedEmail,
          subject: 'VALUE UP PARTNERS 구독 신청 완료',
          html: SUBSCRIBE_HTML,
        })
      } catch (emailSendError: unknown) {
        const errorMessage = emailSendError instanceof Error ? emailSendError.message : String(emailSendError)
        if (emailSendError instanceof Error && emailSendError.stack) {
          console.error('구독 처리 중 오류:', errorMessage, emailSendError.stack)
        } else {
          console.error('구독 처리 중 오류:', errorMessage)
        }
      }
    }
  } catch (error: unknown) {
    const err = error as { code?: string }
    if (err.code === 'P2002') {
      return data({ error: '이미 구독된 이메일입니다.' }, { status: 400 })
    }
    const message = error instanceof Error ? error.message : '구독 처리에 실패했습니다.'
    console.error('구독 처리 오류:', error)
    return data({ error: message }, { status: 500 })
  }

  return data({ success: true, message: '구독이 완료되었습니다.' })
}
