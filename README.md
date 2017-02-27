
#Peer#
#####Monitor social interactions using artificial intelligence to prevent harassment#####

Cyber-bullying plagues many young children's early experience with the Internet and social media, and many parents recognize this and take measures to combat it. However, it can be difficult and time-consuming to monitor a child's entire social media presence, and doing so often builds distrust and contempt between parents and their children. We believe there's a solution to be found that will protect children from cyber-bullying while saving parents time and stress.
#Overview#
####Features####

Peer allows parents to log in using their Facebook accounts and view a comprehensive analysis of all comments made both by and toward any of their children. If the monitored child's account exhibits an exceeding amount of comment activity flagged by IBM's Watson as hostile, angry, or condescending, Peer notifies parent users of the high probability that their child is involved as a bully or a victim in Facebook interactions. Peer also displays the comments made by or toward the child that most heavily influenced the high bully or victim rating. This allows parents to intervene as they see fit, while minimizing the time commitment necessary to supervise their children. Perhaps most beneficially, Peer preserves the trust relationship between parent and child that is often jeopardized by the known surveillance of parent to child.
####Stack####

- Azure - Used to host Peer as a web-app
- HTML5 - Used to structure front-end content
- CSS - Used to style front-end content
- Bootstrap - Framework used for front-end elements
- JavaScript - Used to add responsiveness of front-end as well as to implement Facebook and Watson APIs
- Node.js - Used to manage data transfer between front-end and back-end
- jQuery - Used for front-end animations and managing requests between webpages and server
- Ajax - Used to add elements and animation for a responsive front-end
- Facebook-login-API - Used to access user data from Facebook
- Facebook-Graph - Used to request and parse user data for Watson to analyze
- IBM-Watson - Used to determine the tone of comments to help decide if comments are abusive and flag bullies

#Experience#
####Challenges####

Though we got Facebook authentication to function properly via our locally hosted server, we soon after realized that, in the way that we initially set up our code, unless all intended users happened to run local servers on their machines (highly unlikely), it would not work. To work around this, we painfully moved the authentication process from the user's local server to our Azure server. Now, the onus to authenticate is held on a reliable, dedicated server. One of the larger problems manifested itself later on, although we were able to pass scrape Facebook for comments and pass comments to Watson and receive tone analysis, we were unable to combine both features seamlessly through the user interfaces and node.js.
####Lessons####

As alluded earlier, we learned to implement various APIs into our hacks, as we had never previously attempted to do. We are also far more comfortable with running node.js and Javascript off of a remotely hosted server after our second experience with it at MangoHacks '17.
####Accomplishments####

We're proud of our first successful implementation of not one, but three different APIs in this hack. Though this is our third hackathon as a team, until MangoHacks '17 we had never made any attempts to incorporate API of any sort into our hacks. This is a valuable milestone in our growth as developers.
####Potential####

Our original conception for Peer involved an ambient and constant monitoring of children's Facebook comment activity. Due to time and know-how restrictions, we were forced to cut down on that vision and make Peer into a one-time check with instant results. Ideally for Peer's future, we would like to grow it into a constant service that tracks parents' children's activity after a one-time setup process. Alerts of heightened bully/victim propensity would be emailed to parents who opt in as soon as any new activity spurs an excession of the set threshold for hostility tracking. This "set it and forget it" model would be even more attractive to parents who care for their children's safety, but regret the nosiness it often entails. Other potential features include:

- Parents can only track Facebook users registered as their own children
- Functional Victim and Bully Gauges
- More in-depth reporting of potential harassment incidents
- Links to Facebook comment permalinks
- Email alerts



