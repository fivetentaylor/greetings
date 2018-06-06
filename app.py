from flask import Flask, request, redirect, jsonify
from twilio.twiml.messaging_response import MessagingResponse

from flask import abort, current_app, request
from functools import wraps
from twilio.request_validator import RequestValidator

import redis

import os

app = Flask(__name__)

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

@app.route("/sms", methods=['GET', 'POST'])
@validate_twilio_request
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("The Robots are coming! Head for the hills!")

    return str(resp)

@app.route("/members", methods=['GET'])
def get_members():
    """Get list of users in the app."""
    return jsonify([
        {
            'first_name': 'taylor',
            'last_name': 'sather',
            'phone_number': '18583828381',
        },
        {
            'first_name': 'jessica',
            'last_name': 'sather',
            'phone_number': '17604293043',
        },
    ])

if __name__ == '__main__':
    app.run(port=os.environ['PORT'])

