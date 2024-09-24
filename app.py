from flask import Flask, render_template, redirect, url_for, session, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

with open("credentials.yml", "r") as creds:
    cstring = creds.readlines()[0]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = cstring
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  #hashed pw

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

with app.app_context():
    db.create_all()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/plinko")
def plinko():
    return render_template("plinko.html")

@app.route("/fortunewheel")
def fortunewheel():
    return render_template("fortunewheel.html")

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()  # Hole JSON-Daten aus der Anfrage
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Bitte alle Felder ausfüllen'}), 400

    # Prüfe, ob der Benutzername bereits existiert
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Benutzername existiert bereits'}), 400

    # Neuen User erstellen und Passwort hashen
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    # User in die Datenbank speichern
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User erfolgreich hinzugefügt'}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5700)