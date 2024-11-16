from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

# Initialize the OpenAI model
llm = ChatOpenAI(model="gpt-3.5-turbo", openai_api_key="your-openai-api-key")

# Define a template for the symptom-based suggestion
template = """
You are a medical assistant. Based on the symptoms provided, suggest an appropriate course of action for the patient.
Symptoms: {symptoms}
Suggested Action:
"""

prompt = PromptTemplate(input_variables=["symptoms"], template=template)

def generate_suggestion(symptoms):
    prompt_input = prompt.format(symptoms=symptoms)
    response = llm(prompt_input)
    return response['text']
