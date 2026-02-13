import React, { useState } from 'react';
import './App.css';

// EDITABLE: Customize the title and intro text
const TITLE = "MEET YOUR MATCH — Guided by AI";
const INTRO_TEXT = "Welcome to an AI-powered psychological compatibility assessment. Answer honestly for the most accurate results. Let's begin.";

// EDITABLE: Round 1 - Generic psychological questions (3 questions, each with 3 options and 3 possible AI responses based on choice)
const ROUND1_QUESTIONS = [
  {
    question: "How do you typically process emotions after a challenging day?",
    options: ["I reflect quietly and journal", "I talk it out with someone close", "I distract myself with activities"],
    responses: [
      "Clinical analysis: Reflective processing indicates introspective tendencies. Slightly witty: Like a philosopher in pajamas.",
      "Clinical analysis: External verbalization suggests social emotional regulation. Slightly witty: Chatty as a parrot on caffeine.",
      "Clinical analysis: Distraction-based coping points to avoidance strategies. Slightly witty: Master of the art of 'Netflix and chill'."
    ]
  },
  {
    question: "What environment makes you feel most comfortable?",
    options: ["A quiet, cozy space", "A lively social setting", "An adventurous outdoor area"],
    responses: [
      "Clinical analysis: Preference for solitude aligns with introverted traits. Slightly witty: Homebody with a PhD in blankets.",
      "Clinical analysis: Social comfort indicates extroverted leanings. Slightly witty: Party animal in disguise.",
      "Clinical analysis: Outdoor affinity suggests thrill-seeking behavior. Slightly witty: Adventurer who packs snacks for Everest."
    ]
  },
  {
    question: "How do you approach decision-making?",
    options: ["Carefully weigh pros and cons", "Trust my gut instinct", "Seek advice from others"],
    responses: [
      "Clinical analysis: Analytical approach reflects logical processing. Slightly witty: Spreadsheet wizard in human form.",
      "Clinical analysis: Intuitive style points to instinctive decision-making. Slightly witty: Fortune cookie consultant.",
      "Clinical analysis: Collaborative method indicates reliance on social input. Slightly witty: Group chat decision-maker."
    ]
  }
];

// EDITABLE: Round 2 - Shared memory questions (3 questions, subtly referencing shared experiences; customize for your couple)
const ROUND2_QUESTIONS = [
  {
    question: "Recall a moment when you felt deeply understood by someone. What made it stand out?",
    options: ["A shared laugh over an inside joke", "A quiet gesture of support", "An unexpected adventure together"],
    responses: [
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Laughter as a bonding mechanism.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Subtle support indicating empathy.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Adventure fostering connection."
    ]
  },
  {
    question: "Think about a time you felt time slow down in a positive way. What was the context?",
    options: ["During a heartfelt conversation", "While exploring a new place", "In a moment of shared silence"],
    responses: [
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Conversation as a time-dilating factor.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Exploration enhancing presence.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Silence amplifying intimacy."
    ]
  },
  {
    question: "What activity makes you feel most at ease with a partner?",
    options: ["Cooking a meal together", "Watching a favorite show", "Taking a walk hand-in-hand"],
    responses: [
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Collaborative tasks building comfort.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Shared media as a relaxation ritual.",
      "Shared emotional marker detected. Memory strength: high. Cross-referencing behavioral data: Physical closeness in motion."
    ]
  }
];

// EDITABLE: Round 3 - Witty and emotional questions (3 questions, with gentle roasting and hints)
const ROUND3_QUESTIONS = [
  {
    question: "If your relationship were a movie genre, what would it be?",
    options: ["Rom-com with plenty of laughs", "Drama with heartfelt moments", "Adventure with unexpected twists"],
    responses: [
      "Witty: Ah, the rom-com—because who needs plot when there's banter? Emotional: Recognizing your dynamic: Playful and light-hearted.",
      "Witty: Drama? More like 'tear-jerker central.' Emotional: Acknowledging the second participant: Deep connections here.",
      "Witty: Adventure? Plot twist: You're both terrible at maps. Emotional: Hinting at non-randomness: This match feels fated."
    ]
  },
  {
    question: "What's one quirky habit of yours that your partner finds endearing?",
    options: ["Singing off-key in the shower", "Collecting random souvenirs", "Over-explaining memes"],
    responses: [
      "Witty: Off-key serenades? Tone-deaf but charming. Emotional: Relationship dynamic: Acceptance of imperfections.",
      "Witty: Souvenir hoarder? Museum of junk. Emotional: Time distortion: Months feel like years of memories.",
      "Witty: Meme explainer? Walking Wikipedia. Emotional: Comfort and ease: Effortless togetherness."
    ]
  },
  {
    question: "How would you describe the 'us' in your relationship?",
    options: ["Effortlessly fun and supportive", "Deeply connected and understanding", "Adventurous and spontaneous"],
    responses: [
      "Witty: Effortless? Lazy geniuses. Emotional: Acknowledging bias: This isn't neutral anymore.",
      "Witty: Deep? Abyss of feels. Emotional: Hinting: Second participant involved—objectivity compromised.",
      "Witty: Spontaneous? Chaos coordinators. Emotional: Warmth: This match is special."
    ]
  }
];

// EDITABLE: Interruption text
const INTERRUPTION_TEXT = "Processing compatibility data...\n\n[AI Anomaly Detected]\nObjectivity Warning: Emotional bias detected. This match cannot be anonymous. Neutrality protocols failing.";

// EDITABLE: Personal message from the "second participant" (customize for intimacy)
const PERSONAL_MESSAGE = "This started as something fun, but somewhere along the way, it became about us. You've made these three months unforgettable. Here's to many more.";

// EDITABLE: Final ask and button responses
const FINAL_QUESTION = "Will you be my Valentine?\n(Our first one 🤍)";
const BUTTONS = [
  { text: "Yes, obviously ❤️", response: "Match Confirmed! Let's make this Valentine's unforgettable. 💕" },
  { text: "I was waiting for this", response: "Match Confirmed! I've been waiting too. Excited for us. 💕" },
  { text: "Only if there’s a plan 😌", response: "Match Confirmed! Plan incoming: Dinner, laughs, and us. 💕" }
];

// EDITABLE: Optional epilogue for "Yes" selections
const EPILOGUE = "Valentine's Plan: Cozy dinner at home, followed by our favorite playlist. Can't wait. ❤️";

function App() {
  const [step, setStep] = useState('intro'); // Current step: intro, round1, round2, round3, interruption, message, final, epilogue
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [choices, setChoices] = useState([]); // Store user choices for potential future use

  // Get current round questions
  const getCurrentRound = () => {
    if (step === 'round1') return ROUND1_QUESTIONS;
    if (step === 'round2') return ROUND2_QUESTIONS;
    if (step === 'round3') return ROUND3_QUESTIONS;
    return [];
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    const round = getCurrentRound();
    const question = round[currentQuestionIndex];
    setSelectedOption(optionIndex);
    setChoices([...choices, optionIndex]); // Store choice
    setIsTyping(true);
    // Typewriter effect for response
    let i = 0;
    const text = question.responses[optionIndex];
    setResponseText('');
    const interval = setInterval(() => {
      setResponseText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        // Auto-advance after response
        setTimeout(() => {
          if (currentQuestionIndex < round.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
          } else {
            // End of round
            if (step === 'round1') setStep('round2');
            else if (step === 'round2') setStep('round3');
            else if (step === 'round3') setStep('interruption');
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
          }
        }, 2000); // Delay before next
      }
    }, 50);
  };

  // Handle final button click
  const handleFinalButton = (index) => {
    setResponseText(BUTTONS[index].response);
    setTimeout(() => setStep('epilogue'), 2000);
  };

  // Render current step
  const renderStep = () => {
    if (step === 'intro') {
      return (
        <div className="screen fade-in">
          <h1>{TITLE}</h1>
          <p>{INTRO_TEXT}</p>
          <button onClick={() => setStep('round1')}>Start Assessment</button>
        </div>
      );
    }

    if (['round1', 'round2', 'round3'].includes(step)) {
      const round = getCurrentRound();
      const question = round[currentQuestionIndex];
      return (
        <div className="screen fade-in">
          <h2>Round {step.slice(-1)}: Behavioral Analysis</h2>
          <p>{question.question}</p>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={selectedOption === index ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <div className="response">
              <p>{responseText}</p>
              {isTyping && <span className="cursor">|</span>}
            </div>
          )}
        </div>
      );
    }

    if (step === 'interruption') {
      return (
        <div className="screen fade-in">
          <div className="processing">
            <p>{INTERRUPTION_TEXT}</p>
          </div>
          <button onClick={() => setStep('message')}>Continue</button>
        </div>
      );
    }

    if (step === 'message') {
      return (
        <div className="screen fade-in">
          <h2>Personal Message</h2>
          <p>{PERSONAL_MESSAGE}</p>
          <button onClick={() => setStep('final')}>Next</button>
        </div>
      );
    }

    if (step === 'final') {
      return (
        <div className="screen fade-in centered">
          <p>{FINAL_QUESTION}</p>
          <div className="buttons">
            {BUTTONS.map((btn, index) => (
              <button key={index} onClick={() => handleFinalButton(index)}>
                {btn.text}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 'epilogue') {
      return (
        <div className="screen fade-in">
          <h2>Match Confirmed</h2>
          <p>{responseText}</p>
          <p>{EPILOGUE}</p>
        </div>
      );
    }
  };

  return <div className={`app ${step}`}>{renderStep()}</div>;
}

export default App;