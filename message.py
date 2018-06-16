import os
from redis import StrictRedis
from twilio.rest import Client

def main():
    redis = StrictRedis(charset="utf-8", decode_responses=True)

    # Your Account SID from twilio.com/console
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    # Your Auth Token from twilio.com/console
    auth_token  = os.environ['TWILIO_AUTH_TOKEN']

    client = Client(account_sid, auth_token)

    message = client.messages.create(
	to="+18583828381",
	from_="+14252306654 ",
	body="Hello from Python!")

if __name__ == '__main__':
    main()
