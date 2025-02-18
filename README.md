# Lawpath Technical Test

This project is a technical test given by Lawpath.
It is a Next.js application that integrates with the Australian Post API, using Apollo Client as a proxy to filter API results.
The main purpose of the project is to validate user-submitted addresses and determine if they are correct based on the provided data.

## Getting Started
### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Recommended: latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/11xnt/lawpath-tech-test.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ## or
   yarn install
   ```
3. Update .env.local:
   ```sh
   AUTHORIZATION_TOKEN=<your authorization token value>
   API_URL=<Australian Post API URL>
   GITHUB_CLIENT_ID=<GitHub OAuth App Client ID>
   GITHUB_CLIENT_SECRET=<GitHub OAuth App Client Secret>
   NEXTAUTH_URL=http://localhost:3000 // or your deployment url
   NEXTAUTH_SECRET= // generate with 'openssl rand -base64 32'
   STATIC_EMAIL=allen@lawpath.com // change if you want different log in credentials
   STATIC_PASSWORD=secret // change if you want different log in credentials
   ```
   note: visit [here]() 

### Running the Development Server

Start the development server with:
```sh
npm run dev
## or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Running End-to-End Tests

This project uses Playwright for end-to-end testing.

To run the tests, execute:
```sh
npx playwright test
# ensure development server is up and running in a separate tab
# or you can run the "formTests.spec.ts" file in /tests directory
```

## Live Deployment

You can view the live version of this project at:
[Live Site](https://red-flower-02ff38b1e.4.azurestaticapps.net)

---

