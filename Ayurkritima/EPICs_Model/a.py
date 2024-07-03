import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the disease data from the provided JSON
with open('EPICs_Model/b.txt', 'r') as file:
    data = json.load(file)
diseases = data['diseases']

# Remedies data
remedies_data = {
    "Paroxysmal Positional Vertigo": {
      "Ayurvedic Remedies": ["Shirodhara", "Nasya therapy", "Ashwagandha", "Brahmi"],
      "Lifestyle Recommendations": ["Practice gentle yoga asanas", "Avoid sudden head movements", "Maintain a regular sleep schedule"]
    },
    "Acne": {
      "Ayurvedic Remedies": ["Neem", "Turmeric", "Aloe Vera", "Triphala"],
      "Lifestyle Recommendations": ["Follow a balanced diet", "Stay hydrated", "Keep skin clean with herbal cleansers"]
    },
    "AIDS": {
      "Ayurvedic Remedies": ["Tinospora cordifolia (Guduchi)", "Ashwagandha", "Triphala", "Amalaki"],
      "Lifestyle Recommendations": ["Practice stress-relieving techniques like yoga and meditation", "Maintain a healthy immune system"]
    },
    "Alcoholic Hepatitis": {
      "Ayurvedic Remedies": ["Kutki", "Punarnava", "Bhumyamalaki", "Triphala"],
      "Lifestyle Recommendations": ["Avoid alcohol consumption", "Follow a liver-friendly diet rich in fruits and vegetables", "Stay hydrated"]
    },
    "Allergy": {
      "Ayurvedic Remedies": ["Turmeric", "Neem", "Tulsi", "Triphala"],
      "Lifestyle Recommendations": ["Avoid triggers that worsen allergies", "Practice pranayama for respiratory health"]
    },
    "Arthritis": {
      "Ayurvedic Remedies": ["Guggulu", "Ashwagandha", "Turmeric", "Triphala"],
      "Lifestyle Recommendations": ["Practice gentle exercise like yoga", "Maintain a healthy weight", "Follow an anti-inflammatory diet"]
    },
    "Bronchial Asthma": {
      "Ayurvedic Remedies": ["Vasa", "Trikatu", "Sitopaladi Churna", "Tulsi"],
      "Lifestyle Recommendations": ["Avoid exposure to allergens", "Practice breathing exercises like pranayama", "Maintain indoor air quality"]
    },
    "Cervical Spondylosis": {
      "Ayurvedic Remedies": ["Ashwagandha", "Guggulu", "Bala", "Maharasnadi Kwath"],
      "Lifestyle Recommendations": ["Practice neck exercises", "Maintain correct posture", "Avoid prolonged sitting or standing"]
    },
    "Chickenpox": {
      "Ayurvedic Remedies": ["Neem", "Tulsi", "Sandalwood", "Turmeric"],
      "Lifestyle Recommendations": ["Keep skin clean and dry", "Avoid scratching the blisters", "Take rest"]
    },
    "Chronic Cholestasis": {
      "Ayurvedic Remedies": ["Kutki", "Punarnava", "Triphala", "Bhumyamalaki"],
      "Lifestyle Recommendations": ["Follow a liver-friendly diet", "Stay hydrated", "Avoid alcohol and fatty foods"]
    },
    "Common Cold": {
      "Ayurvedic Remedies": ["Tulsi", "Ginger", "Turmeric", "Triphala"],
      "Lifestyle Recommendations": ["Stay hydrated", "Get plenty of rest", "Keep warm"]
    },
    "Dengue": {
      "Ayurvedic Remedies": ["Papaya Leaf Extract", "Neem", "Tulsi", "Giloy"],
      "Lifestyle Recommendations": ["Stay hydrated", "Get plenty of rest", "Keep surroundings clean to prevent mosquito breeding"]
    },
    "Diabetes": {
      "Ayurvedic Remedies": ["Gurmar", "Bitter Melon (Karela)", "Turmeric", "Triphala"],
      "Lifestyle Recommendations": ["Follow a balanced diet low in sugar and carbohydrates", "Exercise regularly", "Manage stress levels"]
    },
    "Dimorphic Hemorrhoids (Piles)": {
      "Ayurvedic Remedies": ["Triphala", "Haritaki", "Neem", "Guggulu"],
      "Lifestyle Recommendations": ["Avoid straining during bowel movements", "Maintain regular bowel habits", "Stay hydrated"]
    },
    "Drug Reaction": {
      "Ayurvedic Remedies": ["Neem", "Manjistha", "Trikatu", "Triphala"],
      "Lifestyle Recommendations": ["Avoid triggers", "Consult with an Ayurvedic practitioner for personalized treatment"]
    },
    "Fungal infection": {
      "Ayurvedic Remedies": ["Neem", "Turmeric", "Triphala", "Tulsi"],
      "Lifestyle Recommendations": ["Keep skin clean and dry", "Avoid sharing personal items", "Wear loose-fitting clothing"]
    },
    "Gastroenteritis": {
      "Ayurvedic Remedies": ["Ginger", "Coriander", "Cumin", "Triphala"],
      "Lifestyle Recommendations": ["Stay hydrated", "Follow a bland diet", "Rest the digestive system"]
    },
    "GERD": {
      "Ayurvedic Remedies": ["Aloe Vera", "Licorice (Yashtimadhu)", "Triphala", "Bhringraj"],
      "Lifestyle Recommendations": ["Avoid spicy and acidic foods", "Eat smaller meals more frequently", "Maintain a healthy weight"]
    },
    "Heart Attack": {
      "Ayurvedic Remedies": ["Arjuna", "Garlic", "Hawthorn", "Guggulu"],
      "Lifestyle Recommendations": ["Follow a heart-healthy diet", "Exercise regularly", "Manage stress levels"]
    },
    "Hepatitis A": {
      "Ayurvedic Remedies": ["Kutki", "Punarnava", "Bhumyamalaki", "Triphala"],
      "Lifestyle Recommendations": ["Get plenty of rest", "Follow a liver-friendly diet", "Stay hydrated"]
    },
    "Hepatitis B": {
      "Ayurvedic Remedies": ["Kutki", "Bhumyamalaki", "Punarnava", "Triphala"],
      "Lifestyle Recommendations": ["Get vaccinated", "Avoid alcohol consumption", "Follow a liver-friendly diet"]
    },
    "Hepatitis C": {
      "Ayurvedic Remedies": ["Kutki", "Bhumyamalaki", "Punarnava", "Triphala"],
      "Lifestyle Recommendations": ["Get plenty of rest", "Follow a liver-friendly diet", "Avoid alcohol consumption"]
    },
    "Hepatitis D": {
      "Ayurvedic Remedies": ["Kutki", "Bhumyamalaki", "Punarnava", "Triphala"],
      "Lifestyle Recommendations": ["Get vaccinated for Hepatitis B", "Avoid alcohol consumption", "Follow a liver-friendly diet"]
    },
    "Hepatitis E": {
      "Ayurvedic Remedies": ["Kutki", "Bhumyamalaki", "Punarnava", "Triphala"],
      "Lifestyle Recommendations": ["Get plenty of rest", "Follow a liver-friendly diet", "Avoid alcohol consumption"]
    },
    "Hypertension": {
      "Ayurvedic Remedies": ["Arjuna", "Brahmi", "Sarpagandha", "Ashwagandha"],
      "Lifestyle Recommendations": ["Follow a low-sodium diet", "Exercise regularly", "Practice stress management techniques"]
    },
    "Hyperthyroidism": {
      "Ayurvedic Remedies": ["Guggulu", "Brahmi", "Ashwagandha", "Triphala"],
      "Lifestyle Recommendations": ["Follow a balanced diet", "Practice yoga and meditation for stress relief", "Get regular exercise"]
    },
    "Hypoglycemia": {
      "Ayurvedic Remedies": ["Shatavari", "Ashwagandha", "Brahmi", "Triphala"],
      "Lifestyle Recommendations": ["Eat small, frequent meals", "Include complex carbohydrates in the diet", "Avoid excessive sugar intake"]
    },
    "Hypothyroidism": {
      "Ayurvedic Remedies": ["Guggulu", "Ashwagandha", "Triphala", "Brahmi"],
      "Lifestyle Recommendations": ["Include iodine-rich foods like seaweed in the diet", "Get regular exercise", "Manage stress levels"]
    },
    "Impetigo": {
      "Ayurvedic Remedies": ["Neem", "Turmeric", "Triphala", "Aloe Vera"],
      "Lifestyle Recommendations": ["Keep the affected area clean", "Avoid scratching the blisters", "Practice good hygiene"]
    },
    "Jaundice": {
      "Ayurvedic Remedies": ["Kutki", "Punarnava", "Bhumyamalaki", "Triphala"],
      "Lifestyle Recommendations": ["Follow a liver-friendly diet", "Stay hydrated", "Get plenty of rest"]
    },
    "Malaria": {
      "Ayurvedic Remedies": ["Neem", "Tulsi", "Giloy", "Guduchi"],
      "Lifestyle Recommendations": ["Use mosquito nets", "Keep surroundings clean to prevent mosquito breeding", "Stay hydrated"]
    },
    "Migraine": {
      "Ayurvedic Remedies": ["Ginger", "Brahmi", "Shatavari", "Triphala"],
      "Lifestyle Recommendations": ["Identify and avoid triggers", "Practice relaxation techniques", "Maintain regular sleep patterns"]
    },
    "Osteoarthritis": {
      "Ayurvedic Remedies": ["Guggulu", "Boswellia", "Turmeric", "Triphala"],
      "Lifestyle Recommendations": ["Maintain a healthy weight", "Engage in low-impact exercises", "Follow an anti-inflammatory diet"]
    },
    "Paralysis (Brain Hemorrhage)": {
      "Ayurvedic Remedies": ["Ashwagandha", "Brahmi", "Guggulu", "Mahanarayan Oil"],
      "Lifestyle Recommendations": ["Physical therapy", "Regular gentle exercise", "Avoid prolonged bed rest"]
    },
    "Peptic Ulcer Disease": {
      "Ayurvedic Remedies": ["Licorice (Yashtimadhu)", "Amla", "Neem", "Triphala"],
      "Lifestyle Recommendations": ["Follow a bland diet", "Avoid spicy and acidic foods", "Manage stress levels"]
    },
    "Pneumonia": {
      "Ayurvedic Remedies": ["Tulsi", "Ginger", "Triphala", "Sitopaladi Churna"],
      "Lifestyle Recommendations": ["Get plenty of rest", "Stay hydrated", "Practice good respiratory hygiene"]
    },
    "Psoriasis": {
      "Ayurvedic Remedies": ["Neem", "Turmeric", "Aloe Vera", "Triphala"],
      "Lifestyle Recommendations": ["Avoid triggers like stress and certain foods", "Keep skin moisturized", "Practice stress-relieving techniques"]
    },
    "Tuberculosis": {
      "Ayurvedic Remedies": ["Tulsi", "Neem", "Ashwagandha", "Triphala"],
      "Lifestyle Recommendations": ["Follow a nutritious diet", "Get plenty of rest", "Practice good respiratory hygiene"]
    },
    "Typhoid": {
      "Ayurvedic Remedies": ["Giloy", "Neem", "Tulsi", "Ginger"],
      "Lifestyle Recommendations": ["Follow a bland diet", "Stay hydrated", "Get plenty of rest"]
    },
    "Urinary Tract Infection": {
      "Ayurvedic Remedies": ["Gokshura", "Neem", "Cranberry", "Triphala"],
      "Lifestyle Recommendations": ["Stay hydrated", "Practice good hygiene", "Urinate after intercourse"]
    },
    "Varicose Veins": {
      "Ayurvedic Remedies": ["Gotu Kola", "Triphala", "Horse Chestnut", "Ginger"],
      "Lifestyle Recommendations": ["Avoid standing or sitting for long periods", "Elevate legs when resting", "Exercise regularly"]
    }
    # Add more remedies for other diseases...
}

def predict_disease(symptoms):
    """
    Predicts the disease based on the given list of symptoms.
    Returns a list of disease names with the highest matching symptoms.
    """
    matched_diseases = []
    max_match_count = 0
    for disease in diseases:
        disease_symptoms = disease['symptoms']
        match_count = sum(symptom.lower() in (s.lower() for s in disease_symptoms) for symptom in symptoms)
        if match_count > max_match_count:
            max_match_count = match_count
            matched_diseases = [disease['name']]
        elif match_count == max_match_count:
            matched_diseases.append(disease['name'])
    return matched_diseases

symptoms = ["Itching", "Skin rash", "Nodular lesions", "Nasal congestion", "Sneezing", "Heartburn", "Nausea",
            "Chest pain", "Difficulty swallowing", "Fatigue", "Dark urine", "Jaundice", "Joint pain", "Vomiting",
            "Abdominal pain", "Diarrhea", "Shortness of breath", "Wheezing", "Coughing", "Chest tightness", "Headache",
            "Weight loss", "Swollen lymph nodes", "Increased thirst", "Frequent urination", "Blurred vision",
            "Stiffness", "Numbness or weakness in limbs", "Sudden numbness", "Weakness", "Confusion",
            "Difficulty speaking", "Yellowing of skin and eyes", "Fever", "Chills", "Sweating", "Loss of appetite",
            "Pain behind eyes", "Joint and muscle pain", "Skin rash", "Constipation", "High fever", "Pain or discomfort",
            "Coughing up blood", "Runny or stuffy nose", "Sore throat", "Anal itching", "Painless bleeding during bowel movements",
            "Upper body pain or discomfort", "Cold sweats", "Veins that are dark purple or blue in color",
            "Veins that appear twisted and bulging", "Aching pain", "Heavy feeling in legs", "Dry skin", "Hair loss",
            "Rapid heartbeat", "Increased appetite", "Nervousness", "Tremor", "Shakiness", "Sweating", "Hunger",
            "Irritability", "Swelling", "Redness", "Decreased range of motion"]

def remove_symptoms(user_input):
    pattern = r'(?i)\b(' + '|'.join(re.escape(s) for s in symptoms) + r')\b'
    matched_symptoms = []
    for match in re.finditer(pattern, user_input):
        matched_symptom = match.group(0)
        matched_symptoms.append(matched_symptom)
    cleaned_text = re.sub(pattern, '', user_input)
    return cleaned_text, matched_symptoms

@app.route('/predict', methods=['POST'])
def predict_route():
    user_input = request.get_json().get('input')
    if not user_input:
        return jsonify({'error': 'Input parameter is missing'}), 400

    cleaned_text, matched_symptoms = remove_symptoms(user_input)
    predicted_diseases = predict_disease(matched_symptoms)

    # Retrieve remedies for predicted diseases
    remedies = {}
    for disease in predicted_diseases:
        if disease in remedies_data:
            remedies[disease] = remedies_data[disease]

    return jsonify({
        'predicted_diseases': predicted_diseases,
        'remedies': remedies
    })

if __name__ == '__main__':
    app.run(debug=True)
