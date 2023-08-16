from flask import Flask, redirect, request, jsonify, Response
import requests
import jwt
import os
import base64
from urllib.parse import urlencode
import dotenv
dotenv.load_dotenv()

app = Flask(__name__)

# Spotify Configuration
redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')
client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

# # Apple Music Configuration
# private_key_path = 'apple_private_key.p8'
# with open(private_key_path, 'r') as file:
#     private_key = file.read()
# team_id = ''
# key_id = ''


token_key = ''  # This seems to be a security key for your /token endpoint

@app.route('/test', methods=['GET'])
def test():
    return "Test successful"

@app.route('/login', methods=['GET'])
def login():
    query_parameters = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': 'user-read-private user-read-email user-library-read',
        'redirect_uri': redirect_uri
    }
    url = 'https://accounts.spotify.com/authorize?' + urlencode(query_parameters)
    return redirect(url)

# @app.route('/callback', methods=['GET'])
# def callback():
#     code = request.args.get('code')
#     auth_data = {
#         'code': code,
#         'redirect_uri': redirect_uri_login,
#         'grant_type': 'authorization_code'
#     }
#     headers = {
#         'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
#     }
#     res = requests.post('https://accounts.spotify.com/api/token', data=auth_data, headers=headers)
#     access_token = res.json().get('access_token')
#     uri = os.getenv('FRONTEND_URI', 'http://localhost:3000/playlist')
#     return redirect(f"{uri}?access_token={access_token}")

# @app.route('/token', methods=['GET'])
# def token():
#     key = request.args.get('key')
#     if key == token_key:
#         payload = {}
#         headers = {
#             'alg': 'ES256',
#             'kid': key_id
#         }
#         token = jwt.encode(payload, private_key, algorithm='ES256', headers=headers, expiresIn='180d', issuer=team_id)
#         return jsonify({'token': token})
#     return Response("Unauthorized", status=401)

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8888))
    print(f"Listening on port {port} ")
    app.run(port=port)
