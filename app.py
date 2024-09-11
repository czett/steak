from flask import Flask, render_template, redirect, url_for, session

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/plinko")
def plinko():
    return render_template("plinko.html")

if __name__ == "__main__":
    app.run(debug=True, port=5700)