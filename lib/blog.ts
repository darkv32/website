export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    social: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: BlogComment[];
}

// Blog data with your actual posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'cs2103-individual-project',
    title: 'CS2103 Individual Project',
    excerpt: 'Quick page to find Github Page for CS2103 individual project segment.',
    content: `Quick page to find Github Page for \`CS2103\` individual project segment, [here](https://darkvoid32.github.io/ip/).`,
    featuredImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2024-02-17',
    updatedAt: '2024-02-17',
    category: 'academic',
    tags: ['CS2103', 'University', 'Project'],
    readTime: 1,
    views: 150,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'CS2103 Individual Project - Tang Yetong',
      metaDescription: 'Quick reference to find the Github Page for CS2103 individual project segment.',
      keywords: ['CS2103', 'NUS', 'Computer Science', 'Individual Project']
    }
  },
  {
    id: '2',
    slug: 'react-native-ble-createclient-error',
    title: 'Render Error: Cannot read property \'createClient\' of null',
    excerpt: 'Faced some issues tinkering with React Native\'s BLE library and trying to get it to work.',
    content: `Faced some issues tinkering with React Native's BLE library and trying to get it to work. 
Was following this [repo](https://github.com/friyiajr/BLESampleExpo) and was faced with \`Render Error: Cannot read property 'createClient' of null\` while trying to load the app on Expo Go.

The app seems to be crashing on the line: \`new BleManager()\`, but loading the app on emulator works fine and crashes on Expo Go. 
Weird!

## Development Server

1) After playing around I finally got \`BleManager()\` to stop crashing after setting up the project to use a development build by running 

\`\`\`bash
expo prebuild
\`\`\`

2) Create a development build like so:

\`\`\`bash
npx eas build --profile development
\`\`\`

3) Scan the QR, install the app on your phone and open it. Then you will need to run the dev server for your development build:

\`\`\`bash
yarn start --dev-client
\`\`\`

The server should appear on the development build on your phone and then you can run your mobile app.`,
    featuredImage: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2023-11-05',
    updatedAt: '2023-11-05',
    category: 'mobile',
    tags: ['React Native', 'BLE', 'Expo', 'Debugging'],
    readTime: 3,
    views: 420,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Fix React Native BLE createClient Error - Tang Yetong',
      metaDescription: 'Solution for React Native BLE library createClient null error when using Expo Go.',
      keywords: ['React Native', 'BLE', 'Expo', 'Debugging', 'Mobile Development']
    }
  },
  {
    id: '3',
    slug: 'how-to-contribute-padawan-wallet',
    title: 'How to contribute to Padawan Wallet',
    excerpt: 'A quick summary of what the Padawan Wallet is, why it exists and how you can contribute to it!',
    content: `A quick summary of what the [\`Padawan Wallet\`](https://github.com/thunderbiscuit/padawan-wallet) is, why it exists and how you can contribute to it!

## \`Padawan Wallet\`

The \`Padawan Wallet\` project started as a passion project by [@thunderbiscuit](https://github.com/thunderbiscuit) to play around with the newly created \`BDK-Kotlin\` library.
He envisioned a small android app that users can use to learn about bitcoin wallets.
Users will download the wallet, go through its tutorials and delete the app with full confidence that they can navigate other bitcoin wallets on the market. 

With the power of android, \`BDK-Kotlin\` and the bitcoin testnet network he created the first version of the \`Padawan Wallet\` as an open-source project.
After \`Summer of Bitcoin\` came around thunderbiscuit signed up as a mentor and brought in students to not only learn about bitcoin but to contribute to the project. 

The reason why this blog post exists is also because I worked on the project as part of my \`Summer of Bitcoin\` internship too. 
I brought the project from using fragments to Jetpack compose alongside the help many designers.

## How to contribute

As of writing this post the current \`Padawan Wallet\` project is undergoing a major shift to using the \`Summer of bitcoin\` designers' wireframe.
If you do want to help out or just check out the project codebase feel free to join the [discord server](https://discord.com/invite/hbMszDMP3X) where we all are!
You can drop thunderbiscuit or me and message on any questions you have about the codebase and we will be more than happy to reply.

The project uses Jetpack Compose to create the UI, and you can take a look at the design wireframe on our discord.
There are many open issues on the github, most of which are outdated and will be cleared once the project is moved to the Compose framework.

Of course, you can also use the project as inspiration on how to use the \`BDK-Kotlin\` library. 
The library is written in Rust, so do take a look if you are interested, it is also an open-source project!

Lastly, I just want to thank thunderbiscuit for teaching me about the bitcoin network and how to navigate the project codebase throughout the 3 months.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-08-30',
    updatedAt: '2022-08-30',
    category: 'blockchain',
    tags: ['Bitcoin', 'Open Source', 'BDK-Kotlin', 'Android'],
    readTime: 5,
    views: 850,
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'How to Contribute to Padawan Wallet - Bitcoin Development',
      metaDescription: 'Learn how to contribute to the Padawan Wallet project and get involved in Bitcoin development with BDK-Kotlin.',
      keywords: ['Bitcoin', 'Padawan Wallet', 'BDK-Kotlin', 'Open Source', 'Blockchain']
    }
  },
  {
    id: '4',
    slug: 'summer-of-bitcoin-2022',
    title: 'Summer of Bitcoin 2022',
    excerpt: 'This is the last week of the Summer of Bitcoin (SoB) 2022 internship and what a journey it has been.',
    content: `This is the last week of the Summer of Bitcoin (SoB) 2022 internship and what a journey it has been.
When I was job hunting after being released from serving National Service in Singapore, I never thought that I would be taking on one that focused on Bitcoin.
Most of my friends and peers had negative impressions of Bitcoin and crypto in general, and I don't blame them, with all the shady business going on.
Personally though, I am neither for nor against Bitcoin.
I feel that in time bitcoin will fill out its niche, regardless whether its taking over the finance industry or not. 

I applied to numerous software engineer intern positions, though I never found SoB through my job hunting.
It was only after one of my friends sent me the link to SoB semi-jokingly and I thought it was pretty interesting. 
A fully remote intern position where I can do basically whatever I want? 
I thought this once a nice opportunity to learn something completely new to me, and to earn a nice chunk of change for myself too, so I signed up and got in almost immediately.

## Padawan Wallet
In the SoB internship you were either a developer or a designer, and every intern will have to pick a project and get the respective mentor to choose them over every other intern vying for that project.
It is a simple system, whoever catches the mentor's eyes the most will get the opportunity to work for them, and it encourages the interns to put in effort.
Since my programming background is mostly focused on Android, with web development being on the weak side and no knowledge on other up and coming languages like Rust, I went about to try and find some Android / Java projects to work on.
Luckily for me there just so happens to be 1 project that fits the bill, \`Padawan Wallet\`.

Padawan Wallet is an Android app that focuses on bringing bitcoin to the layman. 
Anyone without any bitcoin or bitcoin wallet knowledge can download this app, go through its tutorials and come out confident and ready to use rael Bitcoins.
It is meant to be an easy to download, easy to delete app and I felt that this is the most direct and accessible project that I could do.

So I hopped onto the discord and github and started tackling some of the starter issues that were open.
They were really simple tech debts that I cleared, and I did try to clear as many as I can, partly so others couldn't do them after me.
On hindsight I could have taken a more relaxed approach, seeing that I was one of the few people actually submitting Pull Requests (PR).

To keep things short the project lead, thunderbiscuit, picked me as the project intern for the summer and so my SoB journey began!

## Summer of Bitcoin
SoB holds many seminars, with reading materials for the interns to look through and learn about Bitcoin from.
The seminars were ran in groups and intern led, with different people being picked as the leader each week.
Everyone in the group had a chance to discuss the question they were given for the week, and others can ask clarify their doubts too.
At the end of the session everyone gathered back into the main room and Bitcoin industry experts were there to clear any questions during the seminars.

The materials given was pretty rigorous, and if you did read and look through every resource given thoroughly you would probably come out really, really knowledgable about Bitcoin.
However the depth of Bitcoin is much to expansive for people working on this on the side to really take in the materials in great depth.

I had the chance to clear any doubts the thunderbiscuit too, through discord at anytime which was cool.
I ran through my ideas and thoughts on what some Bitcoin concepts were, and he was there to give examples if I was unsure of anything.

To encourage people to write blogs and put in more work SoB also has some "best intern" awards etc..
You could stand to win a Bitcoin miner and full node if you really wanted too, but I was far too lazy to be writing weekly blogs and stuff, though I did eventually write about using \`BDK-Kotlin\` library functions.

## BDK Library Suite
The heart of Padawan Wallet and some of the other smaller bitcoin projects is the \`BDK-Kotlin\` library.
It wraps the Bitcoin Development Kit code which is written in Rust in Kotlin, and exposes classes and functions for you to use in environments that need it.
Without knowledge on Rust of course, I could not just hop in and contribute to the root BDK library, and I had to wait patiently for each release of \`BDK-Kotlin\` to work on more features. 

The \`BDK\` team meets every week and discusses about the project, which is why the release of \`BDK\` is really fast.
After each release I used another project to test out the new features that were included in the release.
The \`Devkit Wallet\` is much different from the \`Padawan Wallet\`, it is a barebones app that solely focuses on introducing \`BDK-Kotlin\` functions for other developers to take reference from and use on their own projects.

## Working with designers
After the seminars have ended I had around 6 more weeks where I had to do and learn things on my own. 
Learning bitcoin is pretty straightforward as there is a non-exhaustive lsit of things to learn about bitcoin online.
Personally I enjoyed putting on and listening to the MIT cryptocurrency lectures.
The lectures get quite hard to follow sometimes though, since you don't have the lecture notes and stuff some of the conclusions might be quite hard to follow.

The dynamics of my SoB internship was changing too, towards the latter half of the internship. 
I had been working on bring the new features of \`BDK-Kotlin\` into the Devkit Wallet for a few weeks, with what I had done being summarized into my other SoB blogs.
However as I wrapped up more and more of the low-hanging fruits of the features, the remaining features was mainly the multi-sig wallet feature. 
This required too much effort to finish, since it included figuring out how to send the testnet address to someone else, for him to sign it and so on..

So I had reached a point where working on the features would require far too much time, and some of the required functions might not be exposed yet.
For example in \`BDK-Kotlin 0.7.0\`, which was the latest version I had at the time, I could not calculate the total fees when creating a transaction.
It is only after the wallet signs the transaction where you can see the total fees calculated.
To calculate the total fees is just calculating the total \`sats/vbytes\`, but since the transactions object is not fully exposed, I could not calculate the total virtual bytes the transactions took up.

With these issues in mind I decided to move back to working on the Padawan Wallet, and to check up on what the designers have been up to.
They had created many versions of what they had re-imagined the screens to be, and they looked fantastic. 
You can hop over to one of the (designer's blog)[https://medium.com/@himanshuthesuperb/designing-bitcoin-products-is-fun-2-2-4bbc74070d7] to see what he had done.

To bring these ideas forward however, required much deeper knowledge on how Jetpack Compose works.
I delved into how to create drawings with canvas, and turns out that other than some of the mathematics required it really wasn't too difficult.

## Finishing up
I am writing this blog in the last week of the SoB project, I had did basically everything I had in mind, which was pretty simple since I didn't have much in mind in the first place.
I tried to lay down the foundation of all the annoying things to deal with inside the project codebase, like the SQLite database, how to make the boxes etc., so thunderbiscuit has an easier time figuring out what to do. 
If you want to contribute to Padawan Wallet feel free to hop onto the discord and github to see whats up :).

I joined Summer of Bitcoin without any expectations, and I learnt pleasant amount of stuff from it. The program, seminars, thunderbiscuit, the whole team at Padawan Wallet were all super cool.
Will I join a bitcoin company after Summer of Bitcoin though?
Honestly as long as I get paid well I don't really care if the company I join is bitcoin focused or not.
The internship was fun, highly recommend, and I wish thunderbiscuit the best of luck with the project moving forward.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-08-17',
    updatedAt: '2022-08-17',
    category: 'blockchain',
    tags: ['Summer of Bitcoin', 'Internship', 'Bitcoin', 'Padawan Wallet'],
    readTime: 8,
    views: 1200,
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Summer of Bitcoin 2022 Experience - Tang Yetong',
      metaDescription: 'My complete experience during the Summer of Bitcoin 2022 internship, working on Padawan Wallet and learning about Bitcoin development.',
      keywords: ['Summer of Bitcoin', 'Bitcoin', 'Internship', 'Blockchain', 'Padawan Wallet']
    }
  },
  {
    id: '5',
    slug: 'govtech-internship-2022-summer',
    title: 'Everything about my Internship at GovTech 2022 Summer',
    excerpt: 'Everything about my 3 month internship at GovTech 2022 May - July.',
    content: `Everything about my 3 month internship at GovTech 2022 May - July.

## Before

I applied to many places hoping that maybe I could score an internship (all the generic good places) with my limited experience in the industry. 
Most of my experience comes from working as a contract SWE at [RFCom Technologies](https://www.rfcom-tech.com/). 
Other than that I worked at [Travel Prologue](https://travelprologue.com/) as an intern.
I could get all these experiences from connections and they were a big hep in filling out my resume trying to find other jobs.

The person that hired me from Travel Prologue tried to contact me to come back and work for them again but I had changed my number during national service and I didn't know.
It was only long after that fact that I heard the news, so oops, my bad.

There were a few technical coding rounds that I tried and GovTech was the only one that responded back. 
Seeing that I was already a month or two into the job hunt I decided it was a decent place to intern at, and continued further down the interview path.
I actually had 1 more coding round from a finance company that I decided not to do, since I had to re-learn C++ to do it.

The interview was really simple except that fact that I forgot everything about databases, which they asked a few questions about. 
With that I got hired as an intern at GovTech for the _Personalise_ team for my summer before university starts.

## Start

Right when my internship started at GovTech some of the Covid restrictions got lifted, so more people could go to the work place.
I got pretty worried since I was juggling some other stuff (SoB) and going to the workplace means adding 2 hours of travel time to my weekdays. 
That would have been disastrous and I probably would have had to drop my other commitments.
Luckily for me GovTech still mostly practices work from home and I got let off the hook. 
Lucky.

A few days before I was supposed to report to work my _"Reporting Officer"_ (RO) gave me the information on everything I had to install and do, which was pretty good.
The RO was one of the SWEs in the team and not the tech lead, so to be honest I was less stressed asking about small stuff. 
I went to take the company's macbook which was also my first time at the Sandcrawler building that DCube was in.
The place is really close to the mrt and the building itself is pretty cool, though not having a staff pass meant that you had to deal with security everytime you were waiting for someone to let you in.

I got introduced to everyone on the team, which included 4 SWEs, 1 data engineer, 1 designer and 1 person that dealt with the clients (I forgot the title).
The project itself is pretty huge actually, tons of submodules in the backend and a react frontend website was what I was introduced to. 
There are actually other components in the project but those were mostly for the AI and its implementation, which I was not really brought in to help with.

Everyone was a full-stack SWE which is a classic. 
I was given some very basic tasks as a start to get myself familiarized with the codebase, one of which was to change the website banner to the current year.
It didn't cross my mind to make the banner the _current year_, since the task told me to change it to _2022_. 
So I went ahead and pushed a very short 2 liner which still somehow had some peer review changes requested on it. 
After some time when the tech lead looked at the task he said just change the banner to the _current year_ and it clicked in my head that I messed up.
I wasn't thinking ahead and pushed stuff out without thinking through them, which I though was really bad, even though the consequences was pretty trivial.

## Middle

After getting used to the coding environment and all the schedules it was honestly pretty smooth sailing from there. The only problem I encountered was trying to find out which API I had to use and how to use it. Since the team is pretty small the amount of tech debt it had existing inside the code base is to be expected. The lack of documentation is also not a surprise so your choices really are to either memorize which piece of code is where, dig around until you find it, or to ask someone who does. 

This is around the time where I took on the task to handle data for the new Key Results (KR) that the team needed. Metrics such as the number of people who used a certain feature etc. needed to be recorded down so that we can keep track of it more closely. There were other issues such as the data collected being filled with actions that the developers had done. In the task I had to track several new metrics and clean up the dirty data, finally uploading all of them onto \`AWS CloudWatch\` in a way that is easy for non-developers to understand and interpret.

The immediate problem that I faced was that I knew nothing about \`AWS CloudWatch\`. What type of interface is it? How do you upload data onto it? It was a completely new world for me and I had to pick up the pace and get this task done before the internship ends. To start, \`Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), IT managers, and product owners.\`. It collects monitoring and operational data in the form of logs, metrics, and event. Hence if you are curious on how many users perform actions x, you can upload 1 count of metric x onto CloudWatch everytime a users performs that action. You can then hop onto CloudWatch and perform data analytics on that metric, such as the total count of that metric. It is pretty straight forward to upload the data onto CloudWatch as it handles most of backend stuff for you. The metrics are automatically shown when it gets uploaded and it automatically disappears when it does not get updated in a certain amount of time.

Now that I know how CloudWatch works I am left with setting up the code to upload the actual data that I need. Luckily for me there were numerous examples on how to do it already inside the codebase. The bulk of the time spent writing the code actually went into tracing the code from the front-end all the way to the back-end. The code spanned about 6 files from when the back-end receives a click on the feature, to sending the metric to CloudWatch. This flow of metrics that I found was for metrics that are being recorded in real-time, i.e. counting the amount of users that have clicked a button. Another form of metric is simply counting a certain data value from the database at a set time period, and then uploading it to CloudWatch after counting them. Since I had to deal with both of these types of data I had to trace both flows of data management in the back-end. With the AWS credentials that I was given I could access the \`dev\` and \`staging\` databases so I could compare and verify that the data that I collected was correct.

Finally now that I knew how to actually upload the data I had to clean up the data itself. This included removing all forms of data that was created purely by the developer team and had nothing to do with using the product itself. All I had to do here was to filter out every team that only contained developer members but that was slightly complicated too with some of the API restrictions that I had. The final code that I arrived at was messy, to say the least and the best I could do to clean it up was to split the code into methods since the use of comments was few and far between in the codebase.

After setting everything up I had to come up with the documentation for it, so that non-developers could not only understand, but so that they can also recreate what I had done on CloudWatch. This was not difficult at all, but just really tedious, which is what was to be expected of writing documentation. 

## End

Nearing the end of the internship I had left the CloudWatch task up for peer review and went on to deal with other things. I was brought along to OCBC arena to conduct some User Acceptance Testing (UAT) for the team, and I actually had a fun time at the booth that we set up. Not only did I had an excuse not to do my SWE work but I could also just mess around and talk to people outside of asking them to do the interview and forms. Taking a break from staring at the computer screen all day felt really good and refreshing, something I haven't felt in quite a while since I entered national service. Sometime during the last week and last 2 weeks of the internship the pull request for the CloudWatch task got peer reviewed alongside being pushed to the staging environment. It became quite the rush trying to fix all the problems and refreshing my own mind on what I was supposed to do. 

## End of the internship

The 3 month long internship was really fun on hindsight. Not only did I get to learn all about technologies that I have not interacted with before like AWS Services and react, I had the chance to talk to many new people with many different backgrounds. Though I was never sociable I still had a very fun time talking to all of them. Next after this would be starting university and finishing up Summer of Bitcoin and my other contract.`,
    featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-08-02',
    updatedAt: '2022-08-02',
    category: 'career',
    tags: ['GovTech', 'Internship', 'AWS', 'CloudWatch', 'React'],
    readTime: 10,
    views: 950,
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'GovTech Singapore Internship Experience 2022 - Tang Yetong',
      metaDescription: 'Complete breakdown of my 3-month software engineering internship at GovTech Singapore, including AWS CloudWatch work.',
      keywords: ['GovTech', 'Singapore', 'Internship', 'AWS', 'CloudWatch', 'Government Technology']
    }
  },
  {
    id: '6',
    slug: 'bumping-rbf-transaction-fees-bdk-kotlin',
    title: 'Bumping RBF Enabled Transaction Fees using BDK-Kotlin',
    excerpt: 'A quick guide on how to use the BDK-Kotlin 0.8.0 library to bump Replace-By-Fee(RBF) enabled transaction fees.',
    content: `A quick guide on how to use the [\`BDK-Kotlin 0.8.0\`](https://github.com/bitcoindevkit/bdk-kotlin) library to bump Replace-By-Fee(RBF) enabled transaction fees.
You can use the [\`Padawan Wallet\`](https://github.com/thunderbiscuit/padawan-wallet) and [\`dev-kit\`](https://github.com/thunderbiscuit/devkit-wallet/tree/simple-wallet) open-source projects as reference. 

## Selecting transaction to bump fee

Do note creating the actual RBF enabled transaction is covered in another blog post.

Before diving into the details on creating the transaction to bump fees with, you will first have to deal with selecting the transcation to bump fees for.
If you do not already have somewhere to display the transaction that are pending and or confirmed, you will have to do it to retrieve the transaction ID which we need to build the transaction.

You retrieve all transactions by calling :
\`\`\`kotlin
wallet.getTransactions()
\`\`\`
where \`wallet\` is the BDK-Kotlin Wallet object. 

This returns a list of the \`Transaction\` objects which you can use to retrieve the transaction ids (txids) from. 
There are many technicalities that you might face when handling the object depending on the \`BDk-Kotlin\` version.

In the case of \`0.8.0\`, there is an issue with the smart cast for kotlin. 
You can't call \`Transaction\` object's data classes' directly since you have to explicitly cast them to the data classes. 
Either call \`transaction as Transaction.Confirmed\` or \`transaction as Transaction.Unconfirmed\` will do, but do watch out for kotlin calling showing some lint suggestions that the explicit cast is unnecessary.
This is not really an issue however, since you can still run your code with the lint suggestions.

Another way of handling the transaction is filtering the list by type :
\`\`\`kotlin
val unconfirmedTransactions = allTransactions.filterIsInstance<Transaction.Unconfirmed>()
val confirmedTransactions = allTransactions.filterIsInstance<Transaction.Confirmed>()
val sortedTransactions = confirmedTransactions.sortedByDescending { it.confirmation.height }
\`\`\`
This is a simple showcase of how to retrieve unconfirmed and confirmed lists of transactions, together with sorting by how recent the transaction was confirmed.

## BumpFeeBuilder

Now that your user can select a pending or unconfirmed transaction, you can let your users bump the fees for them! 

You will have to use the \`BumpFeeTxBuilder(txid: String, newFeeRate: Float)\` builder to construct the transaction to bump your fees.
The builder takes in the txid and fee rate as the inputs, and below is an example of using it to build a transaction :
\`\`\`kotlin
val psbt: PartiallySignedBitcoinTransaction = BumpFeeTxBuilder(txid = txid, newFeeRate = feeRate)
                                                                .enableRbf()
                                                                .finish(wallet = wallet)
\`\`\`
This creates a transaction with the given txid and fee rate, together with the \`enableRBF()\` method to ensure the new transaction is still RBF enabled (or else it will be disabled by default).
Finally \`finish()\` is called with the wallet to create the \`PSBT\` object you can broadcast!

## Error Handling

If the transaction is not RBF enabled, the broadcast will throw an error. This is also true if the new fee rate is too high / too low, so throw in some error handling.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-07-22',
    updatedAt: '2022-07-22',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'RBF', 'Tutorial'],
    readTime: 4,
    views: 320,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Bumping RBF Transaction Fees with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Learn how to bump Replace-By-Fee enabled transaction fees using the BDK-Kotlin library.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'RBF', 'Replace-By-Fee', 'Blockchain']
    }
  },
  {
    id: '7',
    slug: 'enabling-rbf-transactions-bdk-kotlin',
    title: 'Enabling transactions to use Replace-By-Fee using BDK-Kotlin',
    excerpt: 'A quick guide on how to use the BDK-Kotlin 0.7.0 library to send transactions with the Replace-By-Fee(RBF) feature enabled.',
    content: `A quick guide on how to use the [\`BDK-Kotlin 0.7.0\`](https://github.com/bitcoindevkit/bdk-kotlin) library to send transactions with the Replace-By-Fee(RBF) feature enabled. 
You can use the [\`Padawan Wallet\`](https://github.com/thunderbiscuit/padawan-wallet) and [\`dev-kit\`](https://github.com/thunderbiscuit/devkit-wallet/tree/simple-wallet) open-source projects as reference. 

## TxBuilder

With the \`TxBuilder()\` you can create the transaciton as per usual. 

\`\`\`kotlin
var txBuilder = recipientList.fold(TxBuilder()) { builder, recipient ->
    builder.addRecipient(recipient.address, recipient.amount)
}
txBuilder = txBuilder.enableRbf()
txBuilder = txBuilder.feeRate(satPerVbyte = feeRate)
return txBuilder.finish(wallet)
\`\`\`

As you can see we are just adding the recipient address and amount normally, while adding a \`.enableRBF()\` method. 
Creating the new transaction to replace that one will be covered in a different blog post since that is a whole separate issue with tons of UI etc.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-07-09',
    updatedAt: '2022-07-09',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'RBF', 'Transactions'],
    readTime: 3,
    views: 280,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Enable Replace-By-Fee with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Tutorial on enabling Replace-By-Fee feature for Bitcoin transactions using BDK-Kotlin library.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'RBF', 'Replace-By-Fee', 'Transactions']
    }
  },
  {
    id: '8',
    slug: 'custom-electrum-servers-bdk-kotlin',
    title: 'Custom electrum servers with the BDK-Kotlin wallet',
    excerpt: 'A quick guide on how the user can change the wallet\'s electrum servers.',
    content: `A quick guide on how the user can change the wallet's electrum servers.

## Why

Lets say, for example, you have promised your wallet users absolute anonymity when using it. 
Nobody should be able to come close to figuring out what you or your users are doing on the blockchain.
Perhaps you heard from a friend that the public blockchain indexing services are collecting the data of people who used it.

Although that is *highly* unlikely, the possibility that a public electrum server *can* conduct malicious activities might not sit well with everyone. 
To give an idea of what they *can* do :
 * Lie to you and tell you you have coins that you don't
 * Refuse to relay your spending transactions

It can't however :
 * Give you a fake receive address
 * Steal your wallet private keys

Electrum shares your wallet addresses with the server you are connected to so the server sees all your transactions. 

If you have your own electrum server set up, or just simply want to switch to different electrum addresses on the fly, it is trivially easy to accomplish using the [\`BDK-Kotlin\`](https://github.com/bitcoindevkit/bdk-kotlin) library.

## How

All you have to do is create a new \`BlockchainConfig\` object with the new electrum server URL, create the new \`Blockchain\` object off it, and finally sync the \`Wallet\` to the new \`Blockchain\`.

\`\`\`kotlin
val newBlockchainConfig = BlockchainConfig.Electrum(ElectrumConfig(customElectrumURL, null, 5u, null, 10u))
val newBlockchain = Blockchain(blockchainConfig)
wallet.sync(newBlockchain)
\`\`\`

And that's it! You are now connected to a new public electrum server, or you own custom run one. 

Do note, however, if the electrum server URL you have passed in is invalid (does not point to a server), the app might freeze. 
Do provide your own error handling either on the UI or the backend side.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-06-28',
    updatedAt: '2022-06-28',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'Electrum', 'Privacy'],
    readTime: 3,
    views: 240,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Custom Electrum Servers with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Learn how to configure custom electrum servers for enhanced privacy with BDK-Kotlin wallets.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'Electrum', 'Privacy', 'Blockchain']
    }
  },
  {
    id: '9',
    slug: 'multiple-recipients-transactions-bdk-kotlin',
    title: 'Broadcasting transaction with multiple recipients using BDK-Kotlin',
    excerpt: 'A quick guide on how to use the BDK-Kotlin 0.7.0 library to create a send transaction with multiple recipients.',
    content: `A quick guide on how to use the [\`BDK-Kotlin 0.7.0\`](https://github.com/bitcoindevkit/bdk-kotlin) library to create a send transaction with multiple recipients. 
You can use the [\`Padawan Wallet\`](https://github.com/thunderbiscuit/padawan-wallet) and [\`dev-kit\`](https://github.com/thunderbiscuit/devkit-wallet/tree/simple-wallet) open-source projects as reference. 

## TxBuilder

Creating a transaction with multiple recipients is trivially easy to do using \`BDK-Kotlin\`. After you have created a wallet, you can use the \`TxBuilder()\` object with all the recipient address.

\`\`\`kotlin
val faucetAddress1 = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt"
val faucetAddress2 = "mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB"
val txBuilder = TxBuilder()
	.addRecipient(faucetAddress1, 1000u)
	.addRecipient(faucetAddress2, 1000u)
	.feeRate(1.2f)
val psbt = txBuilder.finish(wallet)
\`\`\`

All you have to do is to call \`.addRecipient(address: String, amount: ULong)\` to the \`TxBuilder()\` builder object. 

### Using lists to create the transaction

The dot notations used on the \`TxBuilder\` object does not work on the actual object itself, but returns the new \`TxBuilder\` object.
To elaborate what I mean, here is an example of using a list to add recipients :

\`\`\`kotlin
val txBuilder = TxBuilder()
for (recipient in recipientList) {
	 txBuilder.addRecipient(address = recipient.first, amount = recipient.second)
}
txBuilder.feeRate(satPerVbyte = feeRate)
return txBuilder.finish(wallet)
\`\`\`

In the above, the \`TxBuilder\` object at the end will not have the recipients nor the fee rate inside, since we are not using the returned \`TxBuilder\`. 

\`\`\`kotlin
var txBuilder = TxBuilder()
for (recipient in recipientList) {
	txBuilder = txBuilder.addRecipient(address = recipient.first, amount = recipient.second)
}
txBuilder = txBuilder.feeRate(satPerVbyte = feeRate)
return txBuilder.finish(wallet)
\`\`\`

You can write this piece of logic however you want, but to give an example of using scopes to read the \`recipientList\` data :

\`\`\`kotlin 
val psbt = recipientList.fold(TxBuilder()) { builder, recipient ->
    builder.addRecipient(recipient.address, recipient.amount)
}.finish(wallet)
\`\`\`

## Sign & Broadcast

After you have the \`PSBT\` object you can do whatever you want with it! Sign and broadcast with the \`Wallet\` and \`Blockchain\` object to send out the transaction.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-06-25',
    updatedAt: '2022-06-25',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'Transactions', 'Multiple Recipients'],
    readTime: 4,
    views: 310,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Multiple Recipients Bitcoin Transactions with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Tutorial on creating Bitcoin transactions with multiple recipients using BDK-Kotlin library.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'Transactions', 'Multiple Recipients', 'Blockchain']
    }
  },
  {
    id: '10',
    slug: 'creating-bitcoin-transactions-bdk-kotlin',
    title: 'Creating Bitcoin transactions using BDK-Kotlin',
    excerpt: 'A quick guide on how to use the BDK-Kotlin 0.7.0 library to create a simple 1 to 1 transaction.',
    content: `A quick guide on how to use the BDK-Kotlin 0.7.0 library to create a simple 1 to 1 transaction, to transfer bitcoin (in our case testnet coins) from 1 person (you) to someone else. You can use the Padawan Wallet and dev-kit open-source projects as reference.

## TxBuilder

To create transactions using \`BDK-Kotlin\` is really simple, with the \`TxBuilder()\` class being really intuitive to use. To create a 1 to 1 transaction you will just have to call \`TxBuilder()\` with all the necessary information for a transaction to be broadcasted. As an example this is a snippet of the code used in \`Padawan Wallet\` :

\`\`\`kotlin
val psbt: PartiallySignedBitcoinTransaction = TxBuilder().addRecipient(recipient, amount).feeRate(satPerVbyte = fee_rate).finish(wallet)
\`\`\`

The variables required to build a valid transactions are \`recipient\`, \`amount\` and \`feeRate\`. We will quickly go through each one since they are simple to understand.

\`recipient: String\` : This is the target address you want to send you \`UTXO\`s to. 

\`amount: ULong\` : This is the amount of \`satoshi\`s you want to send. 

\`feeRate: Float\` : This is the fees you want to spend to broadcast this transaction.

Finally you will have to call \`finish(wallet: BDKWallet)\` with the \`Wallet\` object you have created already. This returns a \`PartiallySignedBitcoinTransaction\` object that you can sign and broadcast with.

## Signing a Transaction

> A Partially Signed Bitcoin Transaction (PSBT) is a Bitcoin standard that facilitates portability of unsigned transactions, which allows multiple parties to easily sign the same transaction. 
> This is most useful when multiple parties wish to add inputs to the same transaction. PSBT was introduced by BIP 174, and allows users to more easily sign transactions on a cold storage device and then broadcast the signed transaction from a device connected to the internet.

An advantage of having the \`PartiallySignedBitcoinTransaction\` object instead of having the library do the signing and broadcasting is that you can do many things with it outside of 1 to 1 transactions, such as adding [\`multi-sig\`](https://101blockchains.com/multisignature-wallets/) functionality in your wallet app. 

To continue where we left off, we will have to sign the transaction :

\`\`\`kotlin
wallet.sign(psbt)
\`\`\`

With this the \`PartiallySignedBitcoinTransaction\` (\`PSBT\`) is signed, and ready to be broadcast!

## Broadcasting a Transaction

\`\`\`kotlin
blockchain.broadcast(signedPsbt)
val psbtTxid = signedPsbt.txid()
\`\`\`

Calling the \`broadcast()\` method on the blockchain object will broadcast the \`PSBT\`. This is return a \`GenericError\` if anything goes wrong with the transaction, i.e. not having enough funds in your account. You can retrieve the transaction id (\`txid\`) by calling \`txid()\` on the \`PSBT\` object. 

With this you have created a 1 to 1 \`PartiallySignedBitcoinTransaction\`, signed and broadcasted it onto the blockchain for all to see!`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-06-25',
    updatedAt: '2022-06-25',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'Transactions', 'Tutorial'],
    readTime: 5,
    views: 380,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Creating Bitcoin Transactions with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Complete guide to creating Bitcoin transactions using the BDK-Kotlin library for Android development.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'Transactions', 'Android', 'Blockchain']
    }
  },
  {
    id: '11',
    slug: 'creating-testnet-wallet-bdk-kotlin',
    title: 'Creating a Testnet wallet using BDK-Kotlin',
    excerpt: 'A quick guide on how to use the BDK-Kotlin 0.7.0 library to create a Bitcoin testnet wallet for your own testing purposes.',
    content: `A quick guide on how to use the [\`BDK-Kotlin 0.7.0\`](https://github.com/bitcoindevkit/bdk-kotlin) library to create a Bitcoin testnet wallet for your own testing purposes. You can use the [\`Padawan Wallet\`](https://github.com/thunderbiscuit/padawan-wallet) and [\`dev-kit\`](https://github.com/thunderbiscuit/devkit-wallet/tree/simple-wallet) open-source projects as reference. 

### BDK-FFI

> This project builds .jar and .aar packages for the jvm and android platforms that provide Kotlin language bindings for the bdk library. 
> The Kotlin language bindings are created by the bdk-ffi project which is included as a git submodule of this repository.

In short, the \`BDK-Kotlin\` library uses Kotlin [language bindings](https://en.wikipedia.org/wiki/Language_binding) that are created by the submodule [\`BDK-FFI\`](https://github.com/bitcoindevkit/bdk-ffi). The \`BDK_FFI\` library creates the \`libbdkffi\` multi-language library for the rust based [bdk](https://github.com/bitcoindevkit) library from the Bitcoin Dev Kit project. The \`bdk-ffi-bindgen\` package builds a tool for generating the actual language binding code used to access the libbdkffi library.

You can follow the steps in the \`BDK-Kotlin\` repository to create the \`.jar\` or \`.aar\` file to use the newest commits in your project.

## Dependency

Use the \`implementation("org.bitcoindevkit:bdk-android:0.7.0")\` dependency in your gradle project. Follow the [maven central](https://search.maven.org/artifact/org.bitcoindevkit/bdk-android) page to see when a new version is released. 

## Creating a new Wallet

To create a new testnet wallet you can call :

\`\`\`kotlin
import org.bitcoindevkit.*
import org.bitcoindevkit.Wallet as BdkWallet

val keys: ExtendedKeyInfo = generateExtendedKey(Network.TESTNET, WordCount.WORDS12, null)
val descriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/0/*)"
val changeDescriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/1/*)"
val database = DatabaseConfig.Sqlite(SqliteDbConfiguration("$path/bdk-sqlite"))
val wallet = BdkWallet(
    descriptor,
    changeDescriptor,
    Network.TESTNET,
    database,
)
\`\`\`
There are many things going on inside this code snippet, and we can go through them one by one. 

### Extended Key

\`\`\`kotlin
fun generateExtendedKey(network: Network, wordCount: WordCount, password: String? ): ExtendedKeyInfo
\`\`\`
To create a brand new wallet we will need to create the [extended keys](https://learnmeabitcoin.com/technical/extended-keys). The method \`generateExtendedKeys\` takes in 3 parameters, \`network: Network\`, \`wordCount: WordCount\`, and a \`password: String?\`. 

The \`network\` parameter is an enum with the values : \`BITCOIN, TESTNET, SIGNET, REGTEST\`. As the name suggests each enum points to a bitcoin network, and we will use \`TESTNET\` for this. 

Similarly \`wordCount\` is also an enum with the values : \`WORDS12, WORDS15, WORDS18, WORDS21, WORDS24\`. The word count selected are the number of words the mnemonic phrase will generate. You can read more about mnemonic phrases introduced in [BIP30](https://medium.com/coinmonks/official-bip39-word-list-mnemonic-24f170ccfe62).

Lastly there is an optional \`password\` parameter. You can choose to secure the wallet with an additional password if needed, but that differs app to app. It is not compulsory at all however, and since we are creating a testnet account we will not be using it here.

We will get a \`ExtendedKeyInfo\` data class back, which contains the newly generated \`mnemonic\` phrase, extended private key \`xpriv\`, and the \`fingerprint\`.

### Descriptors

\`\`\`kotlin
val descriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/0/*)"
val changeDescriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/1/*)"
\`\`\`
Using the extended private key \`xpriv\` we have from the new \`ExtendedKeyInfo\` object, we can create the [descriptors](https://bitcoindevkit.org/descriptors/) for our wallet. In short, it defines how the scripts (and subsequently, addresses) of a wallet should be generated. Descriptors make wallets more portable across different tools and apps, alongside many other advanced uses. 

Note that the \`descriptor\` and the \`changeDescriptor\` Witness Pay to Key Hash descriptor(\`wpkh\`) is different, in that the second last parameter is \`0\` and \`1\` respectively. 

### Configuring SQLITE Database

\`\`\`kotlin
val path = applicationContext.filesDir.toString()
val database = DatabaseConfig.Sqlite(SqliteDbConfiguration("$path/bdk-sqlite"))
\`\`\`
The wallet object uses an \`SQLite\` database. You can use the default \`fileDir\` path from the \`applicationContext\` as the database path. 

### Create the Wallet Object

\`\`\`kotlin
val wallet = BdkWallet(
    descriptor,
    changeDescriptor,
    Network.TESTNET,
    database,
)
\`\`\`
Finally, we have all the variables to create the wallet. However, we still are not done with creating a fully functional wallet you can use, since we still have not created the \`Blockchain\` for our wallet to work on!

## Creating the Blockchain

The \`BDK-Kotlin\` library separated the wallet and blockchain objects to fix various issues such as creating the wallet when there is no internet connection. The blockchain object is simple to create, with just 2 lines of code :

\`\`\`kotlin
val blockchainConfig = BlockchainConfig.Electrum(ElectrumConfig("ssl://electrum.blockstream.info:60002", null, 5u, null, 10u))
val blockchain = Blockchain(blockchainConfig)
\`\`\`

As you can see creating the \`Blockchain\` object is really easy, with the only important variable passed in being the \`Electrum Server\` URL. We are using a public electrum server URL from [\`Blockstream\`](https://blockstream.com/). \`Blockstream\` indexes the blockchain transactions and allows anyone to use their services for free. Indexing the transactions means that searching for transactions become trivially fast, cutting down the time to search the whole blockchain for a single transaction to just a quick lookup on the electrum server. 

This does, however, come at a cost of security, since \`Blockstream\` has the information of the transaction you have looked up, there are things \`Blockstream\` can do maliciously with enough of that information, albeit unlikely. You can change the \`Electrum Server\` URL to your own server URL, but since we are just using the testnet network it is fine to just use \`Blockstream\`'s service.

## Syncing the Wallet

Now that we have the \`Wallet\` and \`Blockchain\` object we can join the pieces of the puzzle together.

\`\`\`kotlin
wallet.sync(blockchain)
\`\`\`

This syncs up the \`Wallet\` object with the \`Blockchain\` object, and finally you can use the \`Wallet\` to receive, sign and broadcast your own transactions!

## Restoring a Wallet

\`\`\`kotlin
import org.bitcoindevkit.*
import org.bitcoindevkit.Wallet as BdkWallet

val keys: ExtendedKeyInfo = restoreExtendedKey(Network.TESTNET, mnemonic, null)
val descriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/0/*)"
val changeDescriptor: String = "wpkh(\${keys.xprv}/84'/1'/0'/1/*)"
val database = DatabaseConfig.Sqlite(SqliteDbConfiguration("$path/bdk-sqlite"))
val wallet = BdkWallet(
    descriptor,
    changeDescriptor,
    Network.TESTNET,
    database,
)
\`\`\`

To restore a wallet, the user will have to pass in their \`Mnemonic Phrase\` to the \`BDK-Kotlin\` library. You can then call \`restoreExtendedKey()\`, simply replacing the \`WordCount\` parameter with the users mnemonic phrase. 

Remember that to recover a wallet you just need the [descriptor](https://bitcoindevkit.org/descriptors/) to let the scripts know how to generate the addresses, hence after retrieving the \`ExtendedKeyInfo\` object it is easy to see that the rest of the code remains the same.`,
    featuredImage: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    author: {
      name: 'Tang Yetong',
      avatar: '/avatar.jpg',
      bio: 'Data Analyst at Fivetran with expertise in data engineering, mobile development, and blockchain technology.',
      social: {
        twitter: '@tangyetong',
        linkedin: 'https://www.linkedin.com/in/tang-yetong/',
        github: 'https://github.com/fivetran-tangyetong'
      }
    },
    publishedAt: '2022-06-25',
    updatedAt: '2022-06-25',
    category: 'blockchain',
    tags: ['BDK-Kotlin', 'Bitcoin', 'Testnet', 'Wallet Creation'],
    readTime: 6,
    views: 450,
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Creating Bitcoin Testnet Wallet with BDK-Kotlin - Tang Yetong',
      metaDescription: 'Complete tutorial on creating a Bitcoin testnet wallet using BDK-Kotlin library for Android development.',
      keywords: ['BDK-Kotlin', 'Bitcoin', 'Testnet', 'Wallet', 'Android', 'Blockchain']
    }
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Bitcoin development, cryptocurrency, and blockchain technology',
    color: 'text-yellow-500',
    postCount: 7
  },
  {
    id: '2',
    name: 'Mobile Development',
    slug: 'mobile',
    description: 'React Native, Android, and mobile app development',
    color: 'text-green-500',
    postCount: 1
  },
  {
    id: '3',
    name: 'Career',
    slug: 'career',
    description: 'Internships, professional experiences, and career insights',
    color: 'text-blue-500',
    postCount: 1
  },
  {
    id: '4',
    name: 'Academic',
    slug: 'academic',
    description: 'University projects and academic work',
    color: 'text-purple-500',
    postCount: 1
  }
];

// Blog utility functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.status === 'published');
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts
    .filter(post => post.featured && post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === categorySlug && post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.status === 'published' &&
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts
    .filter(post => 
      post.status === 'published' &&
      (post.title.toLowerCase().includes(lowercaseQuery) ||
       post.excerpt.toLowerCase().includes(lowercaseQuery) ||
       post.content.toLowerCase().includes(lowercaseQuery) ||
       post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

// Cache implementation
class BlogCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const blogCache = new BlogCache();