import app from "./app";

export default function startApplication() {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
  });
}
