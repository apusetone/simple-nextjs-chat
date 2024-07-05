# simple-nextjs-chat

This project is a WebSocket chat client built using various modern web technologies.

## Project Structure

```plaintext
.
├── LICENSE
├── README.md
├── biome.json
├── bun.lockb
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   ├── components
│   │   └── ChatForm.tsx
│   └── stores
│       └── chatStore.ts
└── tsconfig.json
```

## Technologies Used

- **Bun**: A fast JavaScript runtime.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Biome**: A tool for managing project configurations.
- **React Hook Form**: A library for managing form state in React.
- **Zustand**: A small, fast, and scalable state-management solution using simplified flux principles.

## Getting Started

To get started with the project, follow these steps:

1. **Create a `.env.local` file**:

   Create a `.env.local` file in the root directory of the project and add the following line:

   ```plaintext
   NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
   ```

2. **Install dependencies**:

   ```sh
   bun install
   ```

3. **Run the development server**:

   ```sh
   bun dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Features

- Real-time chat functionality using WebSockets.
- Modern and responsive UI built with Next.js and React.
- State management with Zustand for efficient and scalable state handling.
- Form handling with React Hook Form for easy and performant form management.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
