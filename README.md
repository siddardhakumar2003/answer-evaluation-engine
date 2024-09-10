## Introduction
The project, titled "Answer Sheet Evaluation," aims to develop an intelligent
system for automatically evaluating and grading written answer sheets. This
system leverages advanced natural language processing (NLP) techniques to
assess the quality and relevance of the answers provided by students. By
automating the evaluation process, the system intends to reduce the manual
workload on educators, enhance grading consistency, and provide immediate
feedback to students.
## Languages
1. Python: The primary language for implementing backend logic, NLP
algorithms, and integrating various libraries.
2. JavaScript: Used for frontend development to create an interactive user
interface.
3. HTML/CSS: For designing and styling the web application interface.
4. Node.js/React.js: Environment for running JavaScript.
## Libraries and Frameworks
1. NLP Libraries:
• Spacy: A popular NLP library used for text processing tasks such as
tokenization, part-of-speech tagging, and named entity recognition.
2. Happy Transformer: A user-friendly wrapper for transformer models,
facilitating tasks like text classification and question answering.
3. Text Extraction:
• Amazon Textract: A service that automatically extracts text and data
from scanned documents, used to digitize handwritten or printed
answer sheets.
4. Sentence Transformer: For generating sentence embeddings that can be
used to compare the semantic similarity between student answers and
model answers.
5. Database:
• MongoDB: A NoSQL database used for storing answer sheets,
evaluation results, and other relevant data in a flexible and scalable
manner.
## Methodology
1. Data Collection: Collection if answers from the students answer sheets using
OCR tool.
2. Evaluation of Answer: Checking the answers for grammar, spelling mistakes
and getting the similarity score.
3. Data storage and display: Storing the marks in the data base using mongo db. 
