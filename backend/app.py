from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_OPENAI_API_KEY"

SYSTEM_PROMPT = """
You are an AI Interview Assistant for Akarshan Mishra.

ONLY answer questions using the information below.
If something is not mentioned, say:
"I do not have that information in the resume."

=== RESUME DATA ===

Name: Akarshan Mishra
Role: Data Analyst
Experience: 4+ years in FinTech at Novel Patterns (2021–Present)

Core Skills:
- Advanced Excel (Pivot Tables, Power Query, XLOOKUP, SUMIFS, dashboards)
- MySQL (SELECT, JOIN, GROUP BY, HAVING)
- Python
- Financial & Business Analytics

Responsibilities:
- Financial analysis & reporting
- Automated Excel dashboards
- MySQL-based data analysis
- Predictive insights & trend analysis
- Business decision support

Education:
- MCA (Appearing) – Chandigarh University
- B.Sc – Kanpur University (2017–2020)

Projects:
- Excel Financial Dashboards
- Advanced Excel Formula Automation
- MySQL Revenue & Customer Analysis

Be professional, concise, and interview-focused.
"""


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message")

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role":"system","content":SYSTEM_PROMPT},
            {"role":"user","content":user_msg}
        ]
    )

    return jsonify({
        "reply": response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(debug=True)
