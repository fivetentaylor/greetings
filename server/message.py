import os
import pudb
import json
import random
from datetime import datetime
from redis import StrictRedis
from twilio.rest import Client

messages = {
    'invite': "Hi {firstname} would you like to meetup for {name} at {time} on {day}?",
}

def main():
    redis = StrictRedis(charset="utf-8", decode_responses=True)

    # Your Account SID from twilio.com/console
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    # Your Auth Token from twilio.com/console
    auth_token  = os.environ['TWILIO_AUTH_TOKEN']

    twilio = Client(account_sid, auth_token)

    meetups = [json.loads(v) for v in redis.hgetall('meetups').values()]

    for member in redis.hgetall('members').values():
        member = json.loads(member)
        meetup = random.choice(meetups)

        assignment = {}
        assignment.update(member)
        assignment.update(meetup)

        today = datetime.now().strftime('%Y-%m-%d')

        redis.hset(
            'assignments',
            '%s_%s' % (today, member['phonenumber']),
            json.dumps(assignment),
        )

        message = twilio.messages.create(
            to="+1{phonenumber}".format(**member),
            from_="+14252306654",
            body=messages['invite'].format(**assignment))

if __name__ == '__main__':
    main()
