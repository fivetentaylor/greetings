from flask import Flask, request, redirect, jsonify,\
                  abort, current_app, request

from twilio.twiml.messaging_response import MessagingResponse

from functools import wraps
from twilio.request_validator import RequestValidator

import re
import os
import pudb
import json
from redis import StrictRedis

redis = StrictRedis(charset="utf-8", decode_responses=True)
app = Flask(__name__)

def dicthash(d):
    return hash(tuple(v for _,v in sorted(d.items())))

def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ.get('TWILIO_AUTH_TOKEN'))

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.url.replace('http://', 'https://'),
            request.form,
            request.headers.get('X-TWILIO-SIGNATURE', ''))

        # Continue processing the request if it's valid (or if DEBUG is True)
        # and return a 403 error if it's not
        if request_valid or current_app.debug:
            return f(*args, **kwargs)
        else:
            return abort(403)
    return decorated_function

@app.route("/sms", methods=['POST'])
@validate_twilio_request
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    num = re.subn(r'^\+1', '', request.values['From'])[0]
    msg = request.values['Body']

    member = redis.hget('members', num)
    if member is not None:
        if 'YES' in msg:
            # Add a message
            resp.message("Yay, glad you're coming!")
        elif 'NO' in msg:
            resp.message("Maybe next time!")
        else:
            resp.message("Sorry I don't understand")

        return str(resp)

    return abort(404)

@app.route("/members", methods=['GET'])
def get_members():
    """Get list of members"""
    return jsonify([json.loads(v) for v in redis.hgetall('members').values()])

@app.route("/members", methods=['POST'])
def create_member():
    """Add member to list"""
    redis.hset(
        'members',
        request.json['phonenumber'],
        json.dumps(request.json),
    )
    return 'ok'

@app.route("/members", methods=['DELETE'])
def delete_member():
    """Add member to list"""
    redis.hdel(
        'members',
        request.json['phonenumber'],
    )
    return 'ok'

@app.route("/meetups", methods=['GET'])
def get_meetups():
    """Get list of meetups"""
    return jsonify([json.loads(v) for v in redis.hgetall('meetups').values()])

@app.route("/meetups", methods=['POST'])
def create_meetup():
    """Add meetup to list"""
    blob = json.dumps(request.json)
    key = dicthash(request.json)
    redis.hset(
        'meetups',
        key,
        blob,
    )
    return 'ok'

@app.route("/meetups", methods=['DELETE'])
def delete_meetup():
    """Add meetup to list"""
    blob = json.dumps(request.json)
    key = dicthash(request.json)
    redis.hdel(
        'meetups',
        key,
    )
    return 'ok'

@app.route("/assignments", methods=['GET'])
def get_assignments():
    """Get list of assignments"""
    return jsonify([json.loads(v) for v in redis.hgetall('assignments').values()])

if __name__ == '__main__':
    app.run(port=8000)
