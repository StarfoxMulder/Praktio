# README

This project is a technical challenge designed to test a front-end skillset in React, Redux, React Router, JavaScript/ES6+, HTML, and SASS/CSS using code similar to Praktio's codebase.

Praktio retains all rights in this project. You may not copy, distribute, create derivative works based on, or otherwise use this project for any purpose other than completing this Technical Challenge project and submitting it to Praktio as instructed at the bottom of this README.md file.

## Background

This application is based on our Learner UI, using similar functionality and design patterns. It serves interactive `Activities` to a user in a quiz format, requiring the user to select the best choice and submit their answers. Each submission is checked against the correct answer and the UI is updated accordingly. For example, if a user submits the correct answer, the `Activity` is updated to show that the selections are correct and the user is able to move on to the next `Activity`. Submitting an incorrect selection also notifies the user, with the notification depending on how many tries remain for the `Activity`. Upon completion of the `Activity`, the user is able to review the choices to understand why it is/isn't correct.

To avoid the requirement of loading a backend server and database, API calls are mocked to return sample data and perform basic logic on submissions. You shouldn't have to dig too deep into that part of the code, but you're welcome to if you're interested.

The following API calls are supported (and can be seen in `src/utils/api.js`):

* `GET /activites/` - gets the first `Activity` for the user; this includes user quiz data for that specific `Activity`
* `GET /activities/:activityId/next` - gets the next `Activity` for the user based on the provided activityId; if one doesn't exist, it returns the `Activity` at the provided activityId; this includes user quiz data for that specific `Activity`
* `GET /activities/:activityId/previous` - gets the previous `Activity` for the user based on the provided activityId; if one doesn't exist, it returns the `Activity` at the provided activityId; this includes user quiz data for that specific `Activity`
* `POST /activities/:activityId` - submits the user's selections and returns the updated `Activity` data with user quiz data for that specific `Activity`

`Activity` data is modeled as such:

    /* Activity Model */
    { 
      _id, // The id of the Activity
      tries, // The max number of tries allowed for the Activity
      isSingle, // Whether the Activity supports single or multi-select
      instructions, // Instructions to display for the Activity
      panels: [
        ...
        {
          _id, // The id of the Panel
          type, // The type of content the Panel will contain
          width // The width of the Panel as a decimal
        }
        ...
      ],
      assets: [], // An array of Assets for the Activity, detailed below
      userData: {} // Data associated with the user's progress on the Activity, explained below
    }

    /* UserData Model */
    { 
      tries, // The number of tries the user has attempted
      correct, // Whether the user has correctly completed the Activity
      number, // The Activity number the user is currently on (used for displaying progress)
      total, // The total number of Activities (used for displaying progress)
      stateType, // The current state of the quiz for the given Activity
      showTryAgain, // Whether to show 'Try Again' text within the Instructions
      outOfTries, // Whether the user is out of tries for the Activity
      selected // The user's last submission of selected choice Ids
    }

`Assets` for the `Activity` can be one of three types: `Stateful`, `Document`, and `Choice`

    /* Stateful Asset Model */
    { 
      _id, // The id of the Asset
      panelId, // The Panel id this Asset it associated with
      type, // The type of Asset (Stateful in this case)
      initialGreeting, // The initial text displayed in the speech bubble
      images: [
        ...
        {
          stateType, // The state of the quiz used to determine when to show the image
          url // The source of the image
        }
        ...
      ],
      referenceContent: {
        content // Text content displayed under the Stateful image
      },
    }

    /* Document Asset Model */
    { 
      _id, // The id of the Asset
      panelId, // The Panel id this Asset it associated with
      type, // The type of Asset (Document in this case)
      content // HTML content for the Asset
    }

    /* Choice Asset Model */
    { 
      _id, // The id of the Asset
      panelId, // The Panel id this Asset it associated with
      type, // The type of Asset (Choice in this case)
      content, // Text content displayed for the Choice
      explanation // Text explanation displayed during Review mode
    }

## Requirements

* An internet connection to download the NPM packages
* Chrome browser
  * While it's possible to load this in other browsers, we only support Chrome at this time, so it will be best to use that to avoid potential issues.

## How to set up/Getting started

* Open the folder in a terminal and install NPM packages
  > `npm install`
* Run the application using the start script. This will kick off react-scripts, which should load the page in your browser.
  > `npm run start`

## Your Tasks

Key functionality has been removed from the sample in order to give you the opportunity to implement those features as you see fit. These tasks should take roughly 2 - 6 hours altogether.

1. Under normal circumstances on the initial load of the application, a request is made to obtain the first `Activity` which is subsequently loaded into the Redux store. That code has been removed. Your task is to properly implement it so that the first `Activity` is loaded and ready for the user.

2. The `SUBMIT` button has been removed from the FooterBar component. This button appears to the right of the progress bar. The button is disabled until a user selects a `Choice`. After selecting, the button is enabled and the user can submit by clicking it. Implement this functionality so that a user can submit selections and the results from that submission are properly reflected in UI updates.

3. The FooterBar also contains `BACK` and `NEXT` navigation buttons, which have been removed. This allows a user to navigate to the next `Activity` when the current is complete, or to navigate to the previous `Activity`. The logic should be as follows:
> * The `NEXT` button is displayed to the right of the Progress Bar only after the completion of an `Activity`, and only if it is not the last `Activity` in the list. It should also take the place of the `SUBMIT` button.
> * The `BACK` button is displayed only if the current `Activity` is not the first, and should show up to the left of the Progress Bar.

4. The current implementation of `Choice` selection is single select. Implement multi-select capabilities so that a user can select multiple `Choices` and submit them. Note: To properly test this, you will need to adjust the mock data's `Choices` so that there are multiple correct `Choices`. Do this by setting `correct: true` to more than one `Choice` in `activities.js`

5. Update the current Instructions component to look like the image below. The following needs to be changed:
> * Instructions component moved from static position to be above the right two Panels
> * Number of tries remaining appear on the left
> * Instruction details ('Choose the best answer.') needs to be on the right.
> * Question mark is clickable and shows tooltip with instructions
> * Yellow 'Try again' badge if initial submission is incorrect
> * Red X in place of number if incorrect (styling can be same as what shows up on an incorrect `Choice`)
> * Green check in place of number if correct (styling can be same as what shows up on a correct `Choice`)
> * > Try again instruction bar
>   > ![Try again instruction bar](/images/updated-instruction-bar.png)
> * > Incorrect instruction bar
>   > ![Incorrect instruction bar](/images/updated-instruction-bar-2.png)

Feel free to refactor as you see fit. Below are reference images on how the completed version looks:

> Initial load with disabled SUBMIT
> ![Initial load with disabled SUBMIT](/images/initial-load.png)

> NEXT button
> ![NEXT button](/images/next-nav.png)

> BACK button
> ![BACK button](/images/back-nav.png)

## Submitting Completed Tasks

When you have completed the above tasks, zip/tar the full project and send it to opps@praktio.com. We will reach out after reviewing.

## Questions/Concerns?

If you have any questions/concerns as you're working on this, please feel free to reach out the same way you would if you were on our team. You can reach us at opps@praktio.com, and we will attempt to respond as soon as possible.
