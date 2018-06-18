import os
import pudb
import json
from redis import StrictRedis
from twilio.rest import Client

messages = {
    'invite': "Hi {firstname} would you like to meetup for coffee?",
}

def main():
    redis = StrictRedis(charset="utf-8", decode_responses=True)

    # Your Account SID from twilio.com/console
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    # Your Auth Token from twilio.com/console
    auth_token  = os.environ['TWILIO_AUTH_TOKEN']

    twilio = Client(account_sid, auth_token)

    for member in redis.hgetall('members').values():
        member = json.loads(member)
        message = twilio.messages.create(
            to="+1{phonenumber}".format(**member),
            from_="+14252306654",
            body=messages['invite'].format(**member))

if __name__ == '__main__':
    main()
