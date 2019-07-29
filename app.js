require('dotenv').config();
const fetch = require("node-fetch");

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  weatherKey: process.env.WEATHER_KEY
});



// Listens to incoming messages that contain "hello"
app.message('!weather', ({ message, say }) => {
   
    var og = message.text+'';
    console.log(og);
    var res = og.split(" ");
    console.log(res.length);

    if (res[0]!='!weather'){
        
    }

    if(res.length <=1){
        say("wack");
    } else {

        var lookFor = 'https://api.openweathermap.org/data/2.5/weather?q='+res[1]+',ca&appid=a8b5af5269885fe8d650d24372ae869c';
            console.log(lookFor);
        fetch(lookFor)
            .then(response => response.json())
            .then(data => {
              // Here's a list of repos!
              console.log(data)

              console.log(data.main.temp);

              say(
                [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Your weather update for {{area}}"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Temperature*\nThey do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
                            "alt_text": "alt text for image"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Weather Status*\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
                            "alt_text": "alt text for image"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Extra Info*\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
                            "alt_text": "alt text for image"
                        }
                    },
                    {
                        "type": "divider"
                    }
                    
                ]
              );
            
            });
        

            
    }
    //api.openweathermap.org/data/2.5/weather?q={res[1]}&appid=a8b5af5269885fe8d650d24372ae869c
    
  // say() sends a message to the channel where the event was triggered

});



(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
