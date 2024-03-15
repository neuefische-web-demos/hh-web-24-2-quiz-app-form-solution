// phew… not a lot going on here. Please add some code!
const form = document.querySelector("[data-js=form]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  createCard(data);
});

function createCard(questionData) {
  // prepare Container for new card content
  const newCard = document.createElement("li");
  newCard.classList.add("card-list__item");

  // fill template with html content -> no user data yet!
  newCard.innerHTML = `
  <article class="card">
  <h2 class="card__question" data-js='question'>
    your question here
  </h2>
  <button
    class="card__button-answer"
    type="button"
    data-js="answer-button"
  >
    Show answer
  </button>
  <p class="card__answer" data-js="answer">
    your answer here
  </p>
  <ul class="card__tag-list">
    <li class="card__tag-list-item" data-js='tag'>your tag here</li>
  </ul>
  <div class="card__button-bookmark">
    <button class="bookmark" aria-label="bookmark" type="button" data-js='bookmark'>
      <svg
        class="bookmark__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewbox="0 0 24 24"
      >
        <path
          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
        />
      </svg>
    </button>
  </div>
</article>
  `;

  // get all necessary elements from the new Card:
  const questionElement = newCard.querySelector("[data-js=question]");
  const answerElement = newCard.querySelector("[data-js=answer]");
  const tagElement = newCard.querySelector("[data-js=tag]");
  const answerButton = newCard.querySelector("[data-js=answer-button]");
  const bookmarkButton = newCard.querySelector("[data-js=bookmark]");

  // pass the data into the template
  // this is the secure way. No user generated data is passed into "innerHTML". instead,
  // we grabbed the elements where the data should be displayed and added it with the
  // secure "textContent"
  questionElement.textContent = questionData.question;
  answerElement.textContent = questionData.answer;
  tagElement.textContent = questionData.tag;

  // add user interaction
  answerButton.addEventListener("click", () => {
    answerElement.classList.toggle("card__answer--active");

    const isAnswerVisible = answerElement.classList.contains(
      "card__answer--active"
    );

    if (isAnswerVisible) {
      answerButton.textContent = "Hide Answer";
    } else {
      answerButton.textContent = "Show Answer";
    }
  });

  bookmarkButton.addEventListener("click", () => {
    bookmarkButton.classList.toggle("bookmark--active");
  });

  //place new card onto the webpage
  document.body.append(newCard);
}
