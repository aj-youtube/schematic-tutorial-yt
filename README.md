# Setting up Starter Code

This is the official starter code for the Schematic SaaS payments tutorial featured on my coding YouTube channel. Follow the steps below to get it running locally.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aj-youtube/schematic-tutorial-yt.git
cd schematic-tutorial-yt
````

### 2. Install Dependencies

```bash
npm install
```

---

## 🔑 Set Up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com)
2. Create a new project
3. Copy your **Publishable Key** and **Secret Key**
4. Create a `.env.local` file in the root of the project (based on .env.example) and add the following:

```env
CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

---

## 🧬 Set Up Convex

1. Run the Convex CLI:

```bash
npx convex dev
```

2. When prompted:

   * Log in (or create an account)
   * Name your project
   * Follow the terminal instructions

> 💡 This will create a `convex/` folder and set up your backend automatically.

---

## ✅ Run the App

After setup is complete, start the Next.js development server:

```bash
npm run dev
```

Then open your browser and go to:

```
http://localhost:3000
```

---

## 📁 Starter Code Tech Stack

* [Next.js 15 (App Router)](https://nextjs.org/)
* [Clerk](https://clerk.com) for authentication
* [Convex](https://convex.dev) for serverless database & backend
* [ShadCN UI](https://ui.shadcn.com) for components


## 🙌 Stay Connected

If you found this helpful:

* ⭐️ Star the repo
* 🔔 Subscribe on [YouTube](https://youtube.com/@codewithaj1)
* 🧠 Follow me on [Twitter](https://x.com/ajships)

Thanks for watching and happy building!
