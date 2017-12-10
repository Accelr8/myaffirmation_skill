var https = require('https');
var queryString = require('querystring');

// Lambda function:
exports.handler = function (event, context) {

    console.log('Running event');

};


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
         }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
            ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
            ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);


}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
            ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;


    if("AffirmationType" === intentName){
        var destination = intentRequest.intent.slots.Destination.value;

        if("morning" === destination){
            handleMorningRequest(intent, session, callback);
        } else if ("mid day" === destination){
            handleMidDayRequest(intent, session, callback);
        } else if ("evening" === destination){
           handleEveningRequest(intent, session, callback);
        } else if ("random" === destination){
           handleRandomRequest(intent, session, callback);
          }
        }
        else {
          throw "Invalid intent";
        }

}

function handleMorningRequest(intent, session, callback) {
    var affirmSetMorning = "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable. I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized. " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable. I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.  " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.  " +
    "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.  " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.  " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.  " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.  " +
    "I find it easier and easier to constantly improve myself personally and professionally everyday.  My positive affirmations, goal setting and constant action make me an incredibly successful businessman.  I feel incredibly positive and strong-minded.  " +
    "I love exercising every day.  I am in perfect health and have an amazing body.  Going to the gym, exercising and taking a sauna make me feel well rounded and accomplished and the benefits I receive from exercise are incredible I feel amazing everyday.  " +
    "I attract success.  Success and good things are naturally attracted to me and I feel prosperous and amazing everyday.  " +
    "Success comes to me easily.  Abundance and prosperity flow to me from every direction and I feel exhilarated.  I can’t wait to wake up each day know that success is guaranteed for me.  " +
    "I see opportunity everywhere I look.  Opportunity is everywhere and it is there for me everyday.  I feel overwhelmingly confident and positive everyday with the abundance of opportunity.  " +
    "It’s easy to be successful.  I rejoice the fact that I am successful and will become more and more successful everyday – huge success is inevitable for me.  I feel prosperous and abundant.  " +
    "I feel amazing every morning I wake up.  I bounce out of bed first thing knowing that the day has huge opportunity install for me.  I feel excited, confident and exhilarated each morning as soon as I open my eyes.  " +
    "I am an excellent marketer.  I know how to generate a constant stream of leads and money for any business.  I feel powerful, confident and assured that my marketing skills are amazingly successful.  " +
    "I am an amazing copywriter.  I know how to write copy that grabs attention and pulls incredible results.  I feel powerful, confident and assured that my copywriting skills are awesomely successful.  " +
    "I love writing and sending out information to people.  I know that right now others are more successful and living lives of greater prosperity because I took action and sent them information.  This makes me feel powerful and happy and I absolutely love knowing that it guarantees further success for others and me.  " +
    "I am confident calling and talking to business owners of all success levels – they are no different to anybody else and I realize that.  I feel confident, excited and exhilarated talking to big business owners.  " +
    "I create the life of my dreams.  My plans, goals and actions build my destiny and this makes me feel powerful and in control.  " +
    "I am an unstoppable human being and can achieve anything.  I feel powerful, smart and determined.  " +
    "I am a self starter who does not need any external force to motivate me, all of my motivation comes from within and I can call on it at will.  This makes me feel unstoppable and powerful.  " +
    "I am a motivated and energetic person, I feel good every single day.  This makes me feel healthy, happy and energetic.  " +
    "I am proud of myself and my success, I have achieved a great deal and this is just the beginning, I feel humble and honored.  " +
    "I am a powerful body, powerful mind and a powerful soul.  This makes me feel smart and deserving of the worlds greatest levels of success.  " +
    "I speak my word with confidence and conviction.  My words are powerful and they bring success to others when shared.  I feel smart and important.  " +
    "I am a happy person who is intoxicated with living, I enjoy life and life is good to me.  This makes me feel happy and exhilarated.  " +
    "Each and every day brings fresh new opportunities to me and I can’t wait to begin each day.  This makes me feel excited and at ease.  " +
    "I excel at whatever I do, I have a positive expectancy and I am known to win.  I feel powerful and deserving.  " +
    "I am at peace with the world around me, I understand how it works and where I fit within it.  I am deserving of huge financial wealth and respect, I feel powerful and smart.  " +
    "I have inner strength, grit and the confidence to win at whatever I choose to do.  This makes me feel powerful and at ease knowing that I can conquer any task.  " +
    "I am optimistic and filled with enthusiasm, the world continues to reward me at an accelerating rate and I know with conviction that the future ahead of me holds immeasurable happiness and prosperity.  " +
    "I accomplish more in less time than ever before.  I have world renounced work ethic and work get things done in record time.  I feel unstoppable, powerful and smart.  " +
    "I effortlessly achieve my goals every single time.  I set high goals, achieve them in record time.  I feel powerful, smart and courageous.  " +
    "I am creative at helping others solve their challenges, I have helped other people improve their lives and I feel proud and special.  " +
    "I always give more than what I am paid for, all of my clients are happy and they spread the good word about me every single day.  I feel powerful and smart.  " +
    "My life is filled with harmony and happiness.  Life continues to issue good fortune and wealth my way and I feel energetic and excited.  " +
    "I have a mindset of wealth and abundance, I can achieve anything that I want to and I feel so powerful and unstoppable.   " +
    "Abundance is my natural state, I see abundance everywhere I look and I know that life will always be this way for me.  I feel at ease and proud.  " +
    "I am a people and money magnet, good people and huge fortune are attracted towards me every single day and I feel powerful and smart.  " +
    "Money flows to me easily, frequently and abundantly, I feel gifted and unstoppable. Prosperity is mine and I deserve it and I expect it.  I feel gifted and deserving of my good fortune and prosperity.   ";

    callback(session.attributes,
        buildSpeechletResponseWithoutCard(affirmSetMorning, "true"));
}

function handleMidDayRequest(intent, session, callback) {
    var affirmSetMidDay = "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable.  " +
    "I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized.  " +
    "I am good enough.  I am smart, helpful and worthy of taking up anybody’s time.  Knowing I am good enough makes me feel comfortable, confident and exhilarated.  " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable.  " +
    "I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.  " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.  " +
    "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.  " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.  " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.  " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.  " +
    "I love exercising every day.  I am in perfect health and have an amazing body.  Going to the gym, exercising and taking a sauna make me feel well rounded and accomplished and the benefits I receive from exercise are incredible I feel amazing everyday.    " +
    "I attract success.  Success and good things are naturally attracted to me and I feel prosperous and amazing everyday.  " +
    "Success comes to me easily.  Abundance and prosperity flow to me from every direction and I feel exhilarated.  I can’t wait to wake up each day know that success is guaranteed for me.    " +
    "I see opportunity everywhere I look.  Opportunity is everywhere and it is there for me everyday.  I feel overwhelmingly confident and positive everyday with the abundance of opportunity.    " +
    "It’s easy to be successful.  I rejoice the fact that I am successful and will become more and more successful everyday – huge success is inevitable for me.  I feel prosperous and abundant.    " +
    "I feel amazing every morning I wake up.  I bounce out of bed first thing knowing that the day has huge opportunity install for me.  I feel excited, confident and exhilarated each morning as soon as I open my eyes.   " +
    "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable.      " +
    "I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized.  " +
    "I am good enough.  I am smart, helpful and worthy of taking up anybody’s time.  Knowing I am good enough makes me feel comfortable, confident and exhilarated.    " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable.  " +
    "I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.  " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.  " +
    "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.  " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.    " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.  " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.  " +
    "I find it easier and easier to constantly improve myself personally and professionally everyday.  My positive affirmations, goal setting and constant action make me an incredibly successful businessman.  I feel incredibly positive and strong-minded.    " +
    "I love exercising every day.  I am in perfect health and have an amazing body.  Going to the gym, exercising and taking a sauna make me feel well rounded and accomplished and the benefits I receive from exercise are incredible I feel amazing everyday.    " +
    "I attract success.  Success and good things are naturally attracted to me and I feel prosperous and amazing everyday.  " +
    "Success comes to me easily.  Abundance and prosperity flow to me from every direction and I feel exhilarated.  I can’t wait to wake up each day know that success is guaranteed for me.    " +
    "I see opportunity everywhere I look.  Opportunity is everywhere and it is there for me everyday.  I feel overwhelmingly confident and positive everyday with the abundance of opportunity.    " +
    "It’s easy to be successful.  I rejoice the fact that I am successful and will become more and more successful everyday – huge success is inevitable for me.  I feel prosperous and abundant.    " +
    "I feel amazing every morning I wake up.  I bounce out of bed first thing knowing that the day has huge opportunity install for me.  I feel excited, confident and exhilarated each morning as soon as I open my eyes.   " +
    "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable.      " +
    "I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized.  " +
    "I am good enough.  I am smart, helpful and worthy of taking up anybody’s time.  Knowing I am good enough makes me feel comfortable, confident and exhilarated.    " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable.  " +
    "I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.  " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.  ";

    callback(session.attributes,
        buildSpeechletResponseWithoutCard(affirmSetMidDay, "true"));
}

function handleEveningRequest(intent, session, callback) {
    var affirmSetEvening = "I’m open to receive more money and success, I deserve it and will be a good steward of it.  I feel in control and at ease.  " +
    "I know my value, I honor my worth, I am worthy of receiving abundance and I feel proud and at ease with what the world continues to give me.  " +
    "Creative ideas for money and success flow from me, I feel powerful and gifted. Everywhere I look I see abundance and opportunity.  " +
    "I feel intelligent and gifted.My income is constantly increasing and I deserve it.  I feel gifted and powerful.  " +
    "I am a positive resource and people love to do business with me.  I feel special and gifted.  " +
    "I create wealth with honesty and integrity, I feel honored and at ease with my business and everything that I do.  " +
    "I am now easily and effortlessly attracting unlimited financial prosperity and abundance into every aspect of my life.  I feel exhilarated.  " +
    "Everything I touch returns riches to me, I am unstoppable and I feel courageous and powerful.  " +
    "I always have enough money for anything that I want to do in life, I feel at ease and gifted. The more money I have the more money I can use to help myself and others, I am an excellent steward of money and I feel honored and gifted.  " +
    "My work is always recognized positively, I am unique and my work is world-renowned.  I feel honored and intelligent. Abundance is my natural state of being, I feel at ease and comfortable with every moment I experience in life.  " +
    "I am a business genius; I am creative and make effective business choices.  I feel intelligent and unstoppable.  " +
    "Money comes to me in expected and unexpected ways, it’s attracted to me from every different angle possible.  I feel gifted and powerful.  " +
    "I give myself permission to live an abundant life, I deserve it and I will live the rest of my life from this position of abundance and power.  " +
    "I feel exhilarated and intoxicated on life. I love money and money loves me, money is sacred to me and I do great things with it.  " +
    "The world is a better place because of me and what I do with my large amounts of money.  " +
    "I feel confident and gifted. I have great skill at managing my finances and always have money in abundance.  I feel at ease and happy.  " +
    "I am very comfortable having large sums of money, I am an excellent money manager and do great things with it.  " +
    "I feel confident and powerful. I release all doubt, fears and negative beliefs about money.  Money is a good thing and I deserve large sums of it.  I feel at ease and powerful.  " +
    "I am unlimited in my power to be successful in my business, I feel courageous and gifted.    " +
    "I always attract the right clients at the right time, great clients are attracted to me and there is never a shortage of them.  I feel at ease and powerful.  " +
    "I have absolute certainty in my ability to generate any amount of income I choose.  " +
    "I am one of the smartest people in the world and I am rewarded for this every single day.  I feel gifted and honored. I choose to be successful in each area in my life, I feel happy and accomplished.  " +
    "I am willing to let fear go and live in harmony with all life, I deserve the best of everything and I have no problem receiving it.  I feel gifted and special.  " +
    "I release all of my past beliefs that have limited me from becoming rich, I now think from a position of power and abundance, I am rich and successful and I deserve what I have and more.  I feel entitled and honored.  " +
    "I choose to be successful in each and every area of my life.  Business is just one area of my life and I excel at every single one.  " +
    "I feel gifted and honored. I am confident of my ability to succeed at anything I want to do, I feel smart and powerful.  " +
    "I’m successful in everything that I do, I surprise myself with my ability and achievements and I feel inspired and gifted.  " +
    "I am successful in everything that I do, I am unstoppable and I feel gifted and recognized.  " +
    "I easily and quickly learn the lessons life presents me with, a setback, struggle or failure to me is still a win and a step forward, I feel at ease, happy and confident.  " +
    "I welcome freedom into my mind, I am not restrained to anything and can do whatever I want.  I feel free and empowered.  " +
    "I’m always in the right place at the right time, winning comes easy to me and I feel powerful and gifted.  " +
    "I am open to all possibilities and keep an open mind at all times, I feel at ease when in strange situations and believe in my ability to figure things out and win.  I feel confident and successful.  " +
    "I have a keen capacity to learn new skills that support my success, I am a quick learner and quickly rise to the top of any field which I choose to play.  I feel gifted and entitled.  " +
    "I embrace all change and use it to my higher good, I am an alchemist who can bring success from any situation in life and I am rewarded for it.  I feel special and smart.  " +
    "I love and respect myself and that allows me to have enriching relationships, others love and respect me and I love and respect myself.  I am an amazing person and I am proud of who I am.  I feel at ease and powerful.  " +
    "I give thanks continuously as I move through each day, I understand that I am gifted and for that I am humble and thankful.  " +
    "I acknowledge the blessings I have received in my life with gratitude, I feel honored and humbled.  " +
    "I possess the wisdom the power the motivation the inspiration and the passion to accomplish anything and everything I choose.  I feel entitled and unstoppable.  " +
    "I prosper in health, I prosper in finances, I prosper in love, I prosper in peace and I am an unstoppable human being.  I feel courageous and powerful in everything that I do.  ";

    callback(session.attributes,
        buildSpeechletResponseWithoutCard(affirmSetEvening, "true"));
}

function handleRandomRequest(intent, session, callback) {
    var affirmSetRandom = "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.   " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.     " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.   " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.   " +
    "I find it easier and easier to constantly improve myself personally and professionally everyday.  My positive affirmations, goal setting and constant action make me an incredibly successful businessman.  I feel incredibly positive and strong-minded.   " +
    "I love exercising every day.  I am in perfect health and have an amazing body.  Going to the gym, exercising and taking a sauna make me feel well rounded and accomplished and the benefits I receive from exercise are incredible I feel amazing everyday.     " +
    "I attract success.  Success and good things are naturally attracted to me and I feel prosperous and amazing everyday.   " +
    "Success comes to me easily.  Abundance and prosperity flow to me from every direction and I feel exhilarated.  I can’t wait to wake up each day know that success is guaranteed for me.     " +
    "I see opportunity everywhere I look.  Opportunity is everywhere and it is there for me everyday.  I feel overwhelmingly confident and positive everyday with the abundance of opportunity.     " +
    "It’s easy to be successful.  I rejoice the fact that I am successful and will become more and more successful everyday – huge success is inevitable for me.  I feel prosperous and abundant.     " +
    "I feel amazing every morning I wake up.  I bounce out of bed first thing knowing that the day has huge opportunity install for me.  I feel excited, confident and exhilarated each morning as soon as I open my eyes.    " +
    "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable.       " +
    "I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized.   " +
    "I am good enough.  I am smart, helpful and worthy of taking up anybody’s time.  Knowing I am good enough makes me feel comfortable, confident and exhilarated.     " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable.   " +
    "I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.   " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.   " +
    "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.   " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.     " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.   " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.   " +
    "I find it easier and easier to constantly improve myself personally and professionally everyday.  My positive affirmations, goal setting and constant action make me an incredibly successful businessman.  I feel incredibly positive and strong-minded.     " +
    "I love exercising every day.  I am in perfect health and have an amazing body.  Going to the gym, exercising and taking a sauna make me feel well rounded and accomplished and the benefits I receive from exercise are incredible I feel amazing everyday.     " +
    "I attract success.  Success and good things are naturally attracted to me and I feel prosperous and amazing everyday.   " +
    "Success comes to me easily.  Abundance and prosperity flow to me from every direction and I feel exhilarated.  I can’t wait to wake up each day know that success is guaranteed for me.    " +
    "I see opportunity everywhere I look.  Opportunity is everywhere and it is there for me everyday.  I feel overwhelmingly confident and positive everyday with the abundance of opportunity.     " +
    "It’s easy to be successful.  I rejoice the fact that I am successful and will become more and more successful everyday – huge success is inevitable for me.  I feel prosperous and abundant.     " +
    "I feel amazing every morning I wake up.  I bounce out of bed first thing knowing that the day has huge opportunity install for me.  I feel excited, confident and exhilarated each morning as soon as I open my eyes.    " +
    "I always think and act today.  I feel heroic, confident and exhilarated knowing my actions today will create momentum tomorrow and the next day – I feel unstoppable.       " +
    "I am free of the fear of rejection. Rejection is a necessary thing to achieve success.  I act without fear of rejection and feel confident, strong minded and energized.   " +
    "I am good enough.  I am smart, helpful and worthy of taking up anybody’s time.  Knowing I am good enough makes me feel comfortable, confident and exhilarated.     " +
    "I am free of the fear of mistakes and failure.  Mistakes and failure are good and necessary to achieve success.  I act without fear of failure and feel excited, heroic and unstoppable.   " +
    "I am very proud to be free of judging other people and comparing them to myself.  I feel happy and strong-minded.   " +
    "I am very proud to be free of imagining others are thinking and saying things about me.  This is not true and being free of thinking it makes me happy, worry-free, successful and unleashed.  I feel exhilarated.   " +
    "I love calling my prospects and customers on the phone.  Each call is a new opportunity to build a relationship and help somebody out.  Every time I call my prospects and customers I feel excited and confident.   " +
    "Each and every call I make I start with an incredible level of positive expectation and prosperity.  I know that right now – somewhere someone’s life is better and more prosperous because of my products and services.  I feel confident and exhilarated.     " +
    "I love to close the deal.  When a deal is closed one way or another I rejoice knowing that my time has been well spent and I feel confident and excited about moving onto a new opportunity without any wasted time.   " +
    "I love taking action.  I feel courageous and exhilarated by taking action and I build extreme momentum and prosperity when taking action.   " +
    "I find it easier and easier to constantly improve myself personally and professionally everyday.  My positive affirmations, goal setting and constant action make me an incredibly successful businessman.  I feel incredibly positive and strong-minded.     ";

    callback(session.attributes,
        buildSpeechletResponseWithoutCard(affirmSetRandom, "true"));
}




/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
            ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------



function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to My Affirmations, please say the affirmations you would like to hear today. Just say morning, mid day, or evening.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please tell me what action to take. ";
    var shouldEndSession = false;

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}
// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
