const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    // Our skill will receive a LaunchRequest when the user invokes the skill
    // with the  invocation name, but does not provide any utterance
    // mapping to an intent.
    // For Example, "Open code academy"
    const speakOutput = languageStrings.en.translation.WELCOME_MESSAGE;

    // The response builder contains is an object that handles generating the
    // JSON response that your skill returns.
    return handlerInput.responseBuilder
      .speak(speakOutput) // The text passed to speak, is what Alexa will say.
      .getResponse();
  },
};

const HelloHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
  },
  handle(handlerInput) {
    // This is text that Alexa will speak back
    // when the user says, "Ask code academy to say hello"
    const speakOutput = 'Hello my name is Dubby! Ask me when the next game is and I will tell you who the Golden State Warriors play next!';

    // The response builder contains is an object that handles generating the
    // JSON response that your skill returns.
    return handlerInput.responseBuilder
      .speak(speakOutput) // The text passed to speak, is what Alexa will say.
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const MyFavoriteLanguageHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'myFavoriteLanguageIntent';
  },
  handle(handlerInput) {
    // This is text that Alexa will speak back
    // when the user says, "Ask code academy to say hello"
    const speakOutput = 'Your faovirte language is Javascript';

    // The response builder contains is an object that handles generating the
    // JSON response that your skill returns.
    return handlerInput.responseBuilder
      .speak(speakOutput) // The text passed to speak, is what Alexa will say.
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error.trace);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloHandler,
  	MyFavoriteLanguageHandler,
    HelpHandler,
    CancelAndStopHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

//Language Strings
const languageStrings = {
  'en': {
    translation: {
      SKILL_NAME: 'Dubby Game Day',
      WELCOME_MESSAGE: 'Hello my name is Dubby! Ask me when the next game is and I will tell you who the Golden State Warriors play next!',
      WELCOME_REPROMPT: 'Please say, When is the next game?',
      HELP_MESSAGE: 'You can say, when is the next game?',
      HELP_REPROMPT: 'Sorry I missed that. Please say, when is the next game?',
      STOP_MESSAGE: 'See you next time!',
      NO_GAMES_FOUND: 'I\'m sorry, I could\'t find the game. ',
    },
  },
};
