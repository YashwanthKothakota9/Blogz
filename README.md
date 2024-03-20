<div align='center'>
    <h1 align='center'>Blogz</h1>
    <h3>The Blogs which make you fall in love with writing.</h3>
</div>

<div align='center'>
    <a href="https://blogzs.netlify.app/">Blogz</a>
</div>

<div align='center'>
    <a href="https://twitter.com/Yashcsp22"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/Yashcsp22"></a>
</div>

<br/>

Blogz is a blog creating application which helps to write what you wish also helps to showcase your knowledge to outside world mainly focused on tech industry.

## Features

- **WYSIWYG Blog:** Create blogs to showcase your knowledge and also help others to grow.
- **Self-hosted, open-source:** Host it yourself and hack on it

## Demo

![Notemaker Welcome GIF](.github/images/Blogz.gif)

## Tech Stack

- [React](https://react.dev/) - Library for Frontend
- [Typescript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Appwrite](https://appwrite.io/) - for Backend
- [Linode](https://www.netlify.com/) - Hosting

## Getting Started

### Prerequisites

Here's what you need to be able to run Blogz:

- Node.js (version >= 18)

### 1. Clone the repository

```shell
git clone https://github.com/YashwanthKothakota9/Blogz.git
cd Blogz
```

### 2. Install npm dependencies

```shell
pnpm install
```

To install `pnpm`

```shell
npm install -g pnpm
```

### 3. Copy the environment variables to `.env` and change the values

```shell
touch .env
cp .env.example .env
```

copy your own `appwrite` urls from [here](https://appwrite.io/). Create your own account and follow docs.

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=

VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

### 4. Run the app

```shell
pnpm run dev
```

### 5. Open the app in your browser

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Contributing

Blogz is an open-source WYSIWYG content creation project especially for Programmers and contributions are very much welcome from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
