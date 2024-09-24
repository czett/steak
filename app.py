from flask import Flask, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

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

if __name__ == "__main__":
    app.run(debug=True, port=5700)