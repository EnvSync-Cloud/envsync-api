export const slackWebhook = (
    url: string,
    payload: {
        event_type: string;
        org_name: string;
        app_name?: string;
        user_name: string;
        data: Record<string, any>;
        webhook_name: string;
        linked_to_entity: string;
        timestamp: string;
        url_for_entity_in_question: string;
    }
) => {
    const templateText = {
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `New Activity via *${payload.webhook_name}* on *EnvSync*`
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: "*Action Type:*\n" + payload.event_type
                    },
                    {
                        type: "mrkdwn",
                        text: "*Based to:*\n" + payload.linked_to_entity
                    },
                    {
                        type: "mrkdwn",
                        text: "*Acted by:*\n" + payload.user_name
                    },
                    {
                        type: "mrkdwn",
                        text: "*When:*\n" + payload.timestamp
                    },
                    {
                        type: "mrkdwn",
                        text: "*Message:*\n```" + JSON.stringify(payload.data) + "```"
                    }
                ]
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            emoji: true,
                            text: "Check on Dashboard"
                        },
                        style: "primary",
                        value: payload.url_for_entity_in_question
                    }
                ]
            }
        ]
    }

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(templateText)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Discord webhook failed with status ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error triggering Discord webhook:", error);
        throw error;
    });
}