## Installation

- Open your favorite terminal;
- `cd` to the application directory;
- run `npm install` command.

The application is ready for testing and running.

## Preparations

Before starting the application run unit-test and make sure they pass. To do that run `npm run test:once`

## Running the application

After you make sure the tests are fine, the application is ready to be started. You should start the application by running the command `npm start`.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to use it?

To see some activity and changes just change the date in the date picker. Be aware that there are two types of data:

1. Static data for the current date. It always represented as two bubbles on the timeline;

2. Dynamic or just random data that appear on any date other than the current one.

## Q&A

1. Why not Typescript?

Due to a limited time, I decided to go with a faster solution - implement an application in pure JS. If necessary, I can migrate it to TS.

2. Why so poor architecture?

Because of the application's size (it's really small) there was no reason to spend time trying to bring some architecture solutions.