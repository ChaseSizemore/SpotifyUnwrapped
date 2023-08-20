from flask import Flask, redirect, request, jsonify, Response, make_response
from flask_cors import CORS
import requests
import os
import base64
from urllib.parse import urlencode
import dotenv
dotenv.load_dotenv()

application = Flask(__name__)
application.debug = True
# CORS(application, resources={r"/*": {"origins": "*"}})
CORS(application, resources={r"/*": {"origins": "http://spotifyunwrapped.s3-website-us-east-1.amazonaws.com/"}}, supports_credentials=True)


# Spotify Configuration
redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')
client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

@application.route('/', methods=['GET'])
def home():
    return "Spotify Unwrapped API"


@application.route('/test', methods=['GET'])
def test():
    return "Client Id: " + client_id + " Client Secret: " + client_secret + " Redirect URI: " + redirect_uri

@application.route('/login', methods=['GET'])
def login():
    print("Login route")
    print(redirect_uri)
    query_parameters = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': 'user-read-private user-read-email user-library-read user-top-read playlist-read-private playlist-read-collaborative',
        'redirect_uri': redirect_uri}
    url = 'https://accounts.spotify.com/authorize?' + urlencode(query_parameters)
    return redirect(url)

@application.route('/callback', methods=['GET'])
def callback():
    print("Callback route")
    code = request.args.get('code')
    auth_data = {
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'}
    headers = {'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}
    res = requests.post('https://accounts.spotify.com/api/token', data=auth_data, headers=headers)
    access_token = res.json().get('access_token')
    redirect_url = os.getenv('FRONTEND_URI', 'http://localhost:3000/main') # Redirecting to the frontend application
    redirect_url += '?access_token=' + access_token
    response = make_response(redirect(redirect_url)) # Create a response that redirects user
    # response.set_cookie('spotify_access_token', access_token, max_age=3600)
    return response

# @application.route('/login2', methods=['GET'])
# def login2():
#     pass
# for when soundcloud api is open again
    

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    print(f"Listening on port {port} ")
    application.run(port=port, host='localhost')
