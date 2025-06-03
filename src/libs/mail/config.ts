import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';

import { config } from '@/utils/env';

const client = new SESv2Client({
	region: config.SES_REGION,
	credentials: {
		accessKeyId: config.SES_ACCESS_KEY,
		secretAccessKey: config.SES_SECRET_KEY,
	},
});

export const sendMail = ({
	from,
	to,
	subject,
	text,
	html,
}: {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}) => {
	const input = {
		FromEmailAddress: from,
		Destination: {
			ToAddresses: [
				to,
			],
		},
		ReplyToAddresses: [from],
		Content: {
			Simple: {
				Subject: {
					Data: subject,
				},
				Body: {
					Text: {
						Data: text,
					},
					Html: {
						Data: html,
					},
				},
			},
		},
	};

	const command = new SendEmailCommand(input);
	return client.send(command);
};