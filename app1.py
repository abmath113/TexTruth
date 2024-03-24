import os
os.environ['KERAS_BACKEND'] = 'tensorflow'
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import tensorflow as tf
import keras_core as keras
import keras_nlp
import seaborn as sns
import matplotlib.pyplot as plt
from keras_core.optimizers import Adam
import streamlit as st
import nltk
nltk.download('punkt')
from nltk.util import ngrams
from nltk.lm.preprocessing import pad_sequence, padded_everygram_pipeline
from nltk.lm import MLE, Vocabulary
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
nltk.download('brown')
import string

import textstat

def calculate_complexity(text):
    # Calculate readability metrics
    flesch_kincaid_grade = textstat.flesch_kincaid_grade(text) # difficulty to read
    flesch_reading_ease = textstat.flesch_reading_ease(text) # reading ease
    dale_chall = textstat.dale_chall_readability_score(text) # comprehension difficulty
    coleman_liau = textstat.coleman_liau_index(text) # text readability

    # Combine metrics into a composite complexity score (example weights)
    composite_score = (
        0.4 * flesch_kincaid_grade +
        0.3 * flesch_reading_ease +
        0.2 * dale_chall +
        0.1 * coleman_liau
    )

    return composite_score

def main():
    st.title("Language Model Text Analysis")
    text = st.text_area("Enter the text you want to analyze", height=200)
    if st.button("Analyze"):
        if text:
            score = calculate_complexity(text)
            st.write("The complexity score is: ",score)
        else:
            st.warning("Please enter some text to analyze.")


if __name__ == "__main__":
    main()