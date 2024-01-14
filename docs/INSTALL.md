# Installation Guide for Enigma Code Bot

## Overview

This guide will walk you through the steps to set up and run the Enigma GitHub Bot on your local machine. The bot is built on Node.js and uses the Probot framework.

## Prerequisites

- Git installed on your machine
- Node.js and NPM installed
- GitHub account

## Steps

1. **Fork and Clone the Repository**
   - Fork the Enigma repository to your GitHub account.
   - Clone the forked repository to your local machine:

     ```bash
     git clone [https://github.com/your-username/Enigma.git](https://github.com/your-username/Enigma.git)
     ```

   - Navigate to the cloned repository folder:

     ```bash
     cd Enigma
     ```

2. **Install Dependencies**
   - Install the project dependencies:

     ```bash
     npm install
     npm start
     

3. **Configure GitHub App**
   - Visit http://localhost:3000
   - For first-time users:
     - Click on "New GitHub App" to create a new app.
     - Fill in the necessary information, including the name (e.g., "enigma-test").
     - Install the app in your account only.
     - Go to the app settings and locate the .env file containing the GitHub app ID, client ID, private key, webhook proxy URL, etc.
   - In the GitHub app settings, navigate to "Permissions & events" and "Repository permissions."
     - Update permissions for issues and pull requests to read and write.
       ![ca4e1e00-a466-45f0-b338-1c033ed70a1f](https://github.com/Rani1303/Enigma/assets/103280525/28f14389-7355-4429-8f94-df580eb14dcb)

     - Subscribe to events like issues, pull request, label, issue comment, pull request review comment, and thread.
       ![da5750c0-3ec8-43b7-924f-f3dbf41a888a](https://github.com/Rani1303/Enigma/assets/103280525/bf23ede6-7b69-4c6c-a008-0e439933d8c7)

     - Save the changes.

4. **Install GitHub App in a Test Repository**
   - Create a test repository on GitHub.
   - Go to the repository settings, navigate to "GitHub Apps," and install the Enigma GitHub App.
   - Select the test repository for installation.

5. **Obtain Rapid API Key for Judge0**
   - Go to Rapid API.
   - Search for "Judge0 CE" and subscribe to the API.
   - Copy the provided API key.

6. **Configure Rapid API Key**
   - Paste the copied Rapid API key in the .env file of your local Enigma repository.
   - Restart the server to reflect the changes to the .env file:

     bash
     npm start
     ```

7. **Set up smee.io for Webhook Events**
   - Visit smee.io to listen to webhook payload events from GitHub.
   - Use smee.io to expose your localhost to a proxy server to catch GitHub Webhook events.

8. **Testing**
   - Create a new branch in your test repository.
   - Add a new file with sample code and create a pull request (run or execute command).
   - Ensure the pull request follows the correct format:

     ```markdown
     Language: [Programming Language]
     Input: [Sample Input]
     Output: [Expected Output]
     ```

The Enigma GitHub App will automatically evaluate the code in the pull request.

## Congratulations!

You have successfully set up and configured the Enigma GitHub Bot. Happy coding with Enigma!

## This version includes:
- Clear headings and numbered steps for easy navigation.
- Code snippets and terminal commands formatted for readability.
- Callouts and highlights to draw attention to key steps.
