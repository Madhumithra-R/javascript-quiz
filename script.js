// Quiz data: questions, options, and correct answers
const quizData = [
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "<script src='script.js'>",
            "<script href='script.js'>",
            "<script ref='script.js'>",
            "<script file='script.js'>"
        ],
        correct: 0
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        correct: 0
    },
    {
        question: "What does 'NaN' stand for in JavaScript?",
        options: [
            "Not a Number",
            "New and Null",
            "Negative and Neutral",
            "No Action Needed"
        ],
        correct: 0
    },
    {
        question: "Which operator is used to compare both value and type?",
        options: [
            "===",
            "==",
            "!=",
            "!=="
        ],
        correct: 0
    }
];

// State variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const resultEl = document.getElementById('result');

// Load the current question and its options
function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1}: ${q.question}`;
    optionsEl.innerHTML = ''; // Clear previous options
    selectedOption = null; // Reset selected option

    // Create option buttons
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.textContent = option;
        div.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(div);
    });

    // Update button text and visibility
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
    nextBtn.disabled = true; // Disable until an option is selected
    nextBtn.style.display = 'inline-block'; // Ensure Next button is visible
    resetBtn.style.display = 'none'; // Hide Reset button
    resultEl.textContent = ''; // Clear result
}

// Handle option selection
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedOption = index; // Store selected option
    nextBtn.disabled = false; // Enable Next button
}

// Handle next button click and score update
function handleNext() {
    // Update score based on the selected option
    if (selectedOption === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Display final score and show Reset button
function showResult() {
    questionEl.textContent = '';
    optionsEl.innerHTML = '';
    nextBtn.style.display = 'none'; // Hide Next/Finish button
    resetBtn.style.display = 'inline-block'; // Show Reset button
    resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Reset the quiz to the initial state
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    loadQuestion();
}

// Add event listeners
nextBtn.addEventListener('click', handleNext);
resetBtn.addEventListener('click', resetQuiz);

// Initialize quiz
loadQuestion();