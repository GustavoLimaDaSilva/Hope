## Description

This project was created with two primary goals in mind.

### 1. Learning New Technologies for More Robust Code

When I built my first React application, two recurring issues stood out:

- Lack of type safety  
- Difficulty managing global state  

These problems led to extensive debugging sessions and solutions that I am not particularly proud of today. As a result, the natural next step for this project was to adopt **TypeScript**, which prevented me from running into those issues, and **Zustand**, which I found to be a simple yet scalable solution for global state management.

Additionally, due to its growing popularity, clear structure, and seamless integration with TypeScript and schema validators such as **Zod**, I chose **TanStack** for routing.

### 2. Helping My Parents Learn English Fundamentals

The second motivation behind this project was to help my parents get started with the fundamentals of English and build vocabulary.

While there is a wide variety of language-learning apps available, I found that many of them lack these three components:

- Uninterrupted, conversation-like listening content with English subtitles  
- Flashcards focused on specific aspects of the language rather than random vocabulary  
- Opportunities for learners to actively produce language in a free, conversational context  

## Solution

With these shortcomings in mind, the application was designed around three core features:

- **Conversation-based listening lessons** with subtitles, each targeting a fundamental aspect of the English language  
- **Flashcard decks** associated with specific lessons, along with the ability for users to create their own custom decks  
- **Integration with Google AI models via Firebase**, allowing users to practice language output, an often underestimated component of language acquisition  

## Challenges

- As a front-end developer, I do not yet have the expertise required to design and manage a production-ready database. For this reason, the application currently relies on JSON files as mock data.  
- I am still looking for free and legal sources of listening content suitable for language learning. 


